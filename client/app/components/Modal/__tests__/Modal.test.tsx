import 'react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal Testing', () => {
	it('should not render the modal at the start', () => {
		render(<Modal />);

		expect(screen.queryByTestId('modal')).toBeNull();
		expect(screen.getByTestId('modal-trigger')).toBeInstanceOf(HTMLElement);
		expect(screen.queryByTestId('modal-close')).toBeNull();
	});

	it('should render the modal when the trigger button is clicked', () => {
		render(<Modal testId="test-modal" />);

		fireEvent.click(screen.getByTestId('test-modal-trigger'));

		expect(screen.getByTestId('test-modal')).toBeInstanceOf(HTMLElement);
	});

	it('should call the onModalOpen function the modal is opened', () => {
		const onModalOpenFn = jest.fn();

		render(<Modal onOpenModal={onModalOpenFn} />);

		fireEvent.click(screen.getByTestId('modal-trigger'));

		expect(onModalOpenFn).toHaveBeenCalledTimes(1);
	});

	it('should close the modal when the close button is clicked', () => {
		render(<Modal />);
		fireEvent.click(screen.getByTestId('modal-trigger'));

		fireEvent.click(screen.getByTestId('modal-close'));

		expect(screen.queryByTestId('modal')).toBeNull();
	});

	it('should not present the close button if the close action is not provided', () => {
		render(<Modal actions={[]} />);
		fireEvent.click(screen.getByTestId('modal-trigger'));

		expect(screen.queryByTestId('modal-close')).toBeNull();
		expect(screen.queryAllByAltText('modal-actions')).toHaveLength(0);
	});

	it('should close the modal when the cancel button is clicked', () => {
		const closeModalFn = jest.fn();

		render(
			<Modal
				actions={[
					{
						testId: 'modal-cancel',
						type: 'close',
						text: 'Close',
					},
				]}
				onCloseModal={closeModalFn}
			/>
		);

		fireEvent.click(screen.getByTestId('modal-trigger'));
		fireEvent.click(screen.getByTestId('modal-cancel'));

		expect(screen.queryByTestId('modal')).toBeNull();
		expect(closeModalFn).toHaveBeenCalledTimes(1);
	});

	it('should not call the onCloseModal function when a non-close action is clicked', () => {
		const closeModalFn = jest.fn();
		const onModalButtonClick = jest.fn();

		render(
			<Modal
				actions={[
					{
						testId: 'modal-action',
						type: 'non-close',
						text: 'Action',
						onClick: onModalButtonClick,
					},
				]}
				onCloseModal={closeModalFn}
			/>
		);

		fireEvent.click(screen.getByTestId('modal-trigger'));

		fireEvent.click(screen.getByTestId('modal-action'));

		expect(closeModalFn).toHaveBeenCalledTimes(0);
		expect(onModalButtonClick).toHaveBeenCalledTimes(1);
		expect(screen.queryByTestId('modal')).toBeInstanceOf(HTMLElement);
	});

	it('should render the children', () => {
		render(
			<Modal>
				<div data-testid="modal-children">Children</div>
			</Modal>
		);

		expect(screen.queryByTestId('modal-children')).toBeNull();
		fireEvent.click(screen.getByTestId('modal-trigger'));

		expect(screen.getByTestId('modal-children')).toBeInstanceOf(
			HTMLElement
		);
	});

	it('should render the custom trigger button/text', () => {
		render(
			<Modal
				trigger={<div data-testid="custom-trigger">Custom Trigger</div>}
			/>
		);

		expect(screen.queryByText('Button')).toBeNull();
		expect(screen.getByText('Custom Trigger')).toBeInstanceOf(HTMLElement);

		fireEvent.click(screen.getByTestId('custom-trigger'));

		expect(screen.getByTestId('modal')).toBeInstanceOf(HTMLElement);
	});
});
