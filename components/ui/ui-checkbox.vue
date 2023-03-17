<script setup lang="ts">
import { computed } from 'vue';
import IconCheck from '@/components/icons/IconCheck.vue';

export interface IUiCheckboxProps {
	modelValue: boolean;
	name: string;
	label?: string;
	class?: string;
	rows?: number;
	cols?: number;
}

const props = withDefaults(defineProps<IUiCheckboxProps>(), {
	class: '',
	rows: 10,
	cols: 10,
});

const emit = defineEmits(['update:model-value']);

const classes = computed(
	(): Record<string, boolean> => ({
		[props.class]: true,
		'ui-checkbox': true,
	}),
);

function onCheck(event: Event) {
	const value = (event.target as HTMLInputElement).checked;
	console.log(event, value);
	emit('update:model-value', value);
}
</script>

<template>
	<div :class="classes">
		<input
			:model-value="props.modelValue"
			type="checkbox"
			:name="props.name"
			:checked="props.modelValue"
			:id="props.name"
			@change="onCheck"
		/>
		<label v-bind:for="props.name">
			<IconCheck />
		</label>
	</div>
</template>

<style lang="scss">
.ui-checkbox {
	label {
		background-color: $white;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		gap: 1rem;
		border-radius: 2px;
		border: none;
		margin: 0;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		svg {
			opacity: 0;
			width: 1.5rem;
			height: 1.5rem;
			fill: white;
		}
	}

	input {
		display: none;

		&:checked + label {
			background-color: $darkblue;
			svg {
				opacity: 1;
			}
		}
	}
}
</style>
