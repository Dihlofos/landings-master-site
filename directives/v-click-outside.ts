import type { Directive } from 'vue';

const vClickOutside: Directive = {
	beforeMount(el, binding) {
		el.clickOutsideEvent = (event: MouseEvent) => {
			if (!(el === event.target || el.contains(event.target))) {
				binding.value(event, el);
			}
		};
		document.body.addEventListener('click', el.clickOutsideEvent, { capture: binding.modifiers.capture });
	},
	unmounted(el, binding) {
		document.body.removeEventListener('click', el.clickOutsideEvent, { capture: binding.modifiers.capture });
	},
};

export default vClickOutside;
