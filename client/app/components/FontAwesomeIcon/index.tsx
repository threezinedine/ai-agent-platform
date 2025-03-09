import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faGithub,
	faTwitter,
	faLinkedin,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faGithub, faTwitter, faLinkedin, faCheck, faYoutube);

export default FontAwesomeIcon;
