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
});

const emit = defineEmits(['update:model-value', 'change']);

const classes = computed(
	(): Record<string, boolean> => ({
		[props.class]: true,
		'ui-checkbox': true,
	}),
);

function onCheck(event: Event) {
	const value = (event.target as HTMLInputElement).checked;
	emit('update:model-value', value);
	emit('change');
}
</script>

<template>
	<div :class="[classes]">
		<input
			:model-value="props.modelValue"
			type="checkbox"
			:name="props.name"
			:checked="props.modelValue"
			:id="props.name"
			@change="onCheck"
		/>
		<label v-bind:for="props.name">
			<div class="check">
				<IconCheck />
			</div>
			{{ props.label }}
		</label>
	</div>
</template>

<style lang="scss">
.ui-checkbox {
	label {
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;

		.check {
			background-color: $white;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 2rem;
			height: 2rem;
			gap: 1rem;
			border-radius: 2px;
			border: 1px solid $darkblue;
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
	}

	input {
		display: none;

		&:checked + label .check {
			background-color: $darkblue;
			svg {
				opacity: 1;
			}
		}
	}
}
</style>
