<script setup lang="ts">
import { computed } from 'vue';

export interface IUiInputProps {
	modelValue: string;
	name: string;
	label?: string;
	class?: string;
	type?: 'text' | 'email' | 'password';
	textarea?: boolean;
	rows?: number;
	cols?: number;
	required?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<IUiInputProps>(), {
	type: 'text',
	class: '',
	textarea: false,
	rows: 10,
	cols: 10,
	required: false,
	disabled: false,
});

const emit = defineEmits(['update:model-value']);

const classes = computed(
	(): Record<string, boolean> => ({
		[props.class]: true,
		'ui-input': true,
	}),
);

function onInput(event: Event) {
	const value = (event.target as HTMLInputElement).value;
	emit('update:model-value', value);
}
</script>

<template>
	<div :class="classes">
		<label
			v-if="props.label"
			v-bind:for="props.name"
		>
			{{ props.label }}
		</label>
		<template v-if="textarea">
			<textarea
				:model-value="props.modelValue"
				:name="props.name"
				:type="props.type"
				:value="props.modelValue"
				:id="props.name"
				:rows="props.rows"
				:required="props.required"
				:disabled="props.disabled"
				@input="onInput"
			/>
		</template>
		<template v-else>
			<input
				:model-value="props.modelValue"
				:name="props.name"
				:type="props.type"
				:value="props.modelValue"
				:id="props.name"
				:required="props.required"
				:disabled="props.disabled"
				@input="onInput"
			/>
		</template>
	</div>
</template>

<style lang="scss">
.ui-input {
	label {
		display: block;
		font-size: 1.8rem;
		margin: 0 0 1rem;
	}
	input,
	textarea {
		border-radius: 3px;
		padding: 1rem;
		color: $black;
		width: 100%;
		resize: vertical;
	}
}
</style>
