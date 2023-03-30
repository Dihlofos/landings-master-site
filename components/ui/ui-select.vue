<script setup lang="ts">
import { computed, ref } from 'vue';
import IconArrow from '../icons/IconArrow.vue';

import vClickOutside from '@/directives/v-click-outside';

export interface IUiSelectProps {
	modelValue: string;
	name: string;
	options: string[];
	label?: string;
	class?: string;
	required?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<IUiSelectProps>(), {
	class: '',
	required: false,
	disabled: false,
});

const emit = defineEmits(['update:model-value', 'change']);

const classes = computed(
	(): Record<string, boolean> => ({
		[props.class]: true,
		'ui-select': true,
		'show-dropdown': isShowOptions.value,
	}),
);

const isShowOptions = ref(false);

function onInput(event: Event) {
	const value = (event.target as HTMLInputElement).value;
	change(value);
}

function change(newOption: string) {
	emit('update:model-value', newOption);
	emit('change');
}

function toggleDropDown() {
	isShowOptions.value = !isShowOptions.value;
}

function hideDropDown() {
	if (isShowOptions.value) {
		isShowOptions.value = false;
	}
}

function checkOptions(opt: string) {
	change(opt);
	hideDropDown();
}
</script>

<template>
	<div
		:class="classes"
		v-click-outside.capture="hideDropDown"
	>
		<button
			class="ui-select__field"
			type="button"
			@click="toggleDropDown"
		>
			{{ props.modelValue }}
			<IconArrow class="ui-select__icon" />
		</button>
		<ul class="ui-select__dropdown">
			<li
				v-for="opt in props.options"
				class="ui-select__item"
				:key="opt"
				@click="checkOptions(opt)"
			>
				{{ opt }}
			</li>
		</ul>

		<label
			v-if="props.label"
			v-bind:for="props.name"
		>
			{{ props.label }}
		</label>

		<select
			:model-value="props.modelValue"
			:name="props.name"
			:value="props.modelValue"
			:id="props.name"
			:required="props.required"
			:disabled="props.disabled"
			@input="onInput"
		>
			<option
				v-for="opt in props.options"
				:key="opt"
			>
				{{ opt }}
			</option>
		</select>
	</div>
</template>

<style lang="scss">
.ui-select {
	position: relative;
	min-width: 15rem;

	select {
		display: none;
	}

	&__dropdown {
		display: none;
		position: absolute;
		top: 2.8rem;
		left: 0;
		background-color: $white;
		color: $black;
		list-style: none;
		padding: 0;
		width: 100%;
		border-left: 2px solid $yellow;
		z-index: 10;

		.show-dropdown & {
			display: block;
		}
	}

	&__item {
		padding: 0.5rem;
		font-size: 1.4rem;
		line-height: 1;
		cursor: pointer;

		&:hover {
			background-color: $yellow;
		}
	}

	&__icon {
		transition: 0.2s transform ease-in;

		.show-dropdown & {
			transform: rotate(180deg);
		}
	}

	&__field {
		border: 2px solid $yellow;
		display: flex;
		justify-content: space-between;
		border-radius: 3px;
		padding: 0.5rem;
		height: 3rem;
		color: $black;
		width: 100%;
		resize: vertical;
		background: $white;
		text-align: left;
	}
}
</style>
