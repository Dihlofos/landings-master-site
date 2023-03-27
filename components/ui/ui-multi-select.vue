<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import IconArrow from '@/components/icons/IconArrow.vue';

import UiCheckbox from '@/components/ui/ui-checkbox.vue';

import vClickOutside from '@/directives/v-click-outside';

export interface IUiMultiSelectProps {
	modelValue: string[];
	name: string;
	options: string[];
	label?: string;
	class?: string;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
}

const props = withDefaults(defineProps<IUiMultiSelectProps>(), {
	class: '',
	required: false,
	disabled: false,
	placeholder: 'Выбрать',
});

const emit = defineEmits(['update:model-value', 'change']);

const classes = computed(
	(): Record<string, boolean> => ({
		[props.class]: true,
		'ui-multi-select': true,
		'show-dropdown': isShowOptions.value,
	}),
);

const isShowOptions = ref(false);
const optionsCheck = ref<boolean[]>([]);
const labelValue = computed((): string => {
	if (!props.modelValue.length) {
		return props.placeholder;
	}

	if (props.modelValue.length === 1) return props.modelValue[0];

	return `${props.modelValue.length} выбрано`;
});

function change(newOption: string[]) {
	emit('update:model-value', newOption);
	emit('change', newOption);
}

function toggleDropDown() {
	isShowOptions.value = !isShowOptions.value;
}

function hideDropDown() {
	if (isShowOptions.value) {
		isShowOptions.value = false;
	}
}

function checkOptions(opt: any, index: number) {
	const res: string[] = [...props.modelValue];
	if (optionsCheck.value[index]) {
		res.push(opt);
	} else {
		res.splice(index - 1, 1);
	}
	change(res);
}

watch(
	() => [props.options, props.modelValue],
	() => (optionsCheck.value = props.options.map(item => !!props.modelValue.includes(item))),
);
</script>

<template>
	<div
		:class="classes"
		v-click-outside.capture="hideDropDown"
	>
		<button
			class="ui-multi-select__field"
			type="button"
			@click="toggleDropDown"
		>
			{{ labelValue }}
			<IconArrow class="ui-multi-select__icon" />
		</button>
		<ul class="ui-multi-select__dropdown">
			<li
				v-for="(opt, index) in props.options"
				class="ui-multi-select__item"
				:key="opt"
			>
				<UiCheckbox
					v-model="optionsCheck[index]"
					:name="`${opt}_${props.name}_site-option`"
					:label="opt"
					@change="checkOptions(opt, index)"
				/>
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
.ui-multi-select {
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
		display: flex;
		align-items: center;
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
