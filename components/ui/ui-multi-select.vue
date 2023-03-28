<script setup lang="ts">
// TODO Добавить проверку на то были ли изменения в селекте, и дергать изменение, только при закрытии селекта';
import { computed, ref, watch } from 'vue';
import IconArrow from '@/components/icons/IconArrow.vue';

import UiCheckbox from '@/components/ui/ui-checkbox.vue';

import vClickOutside from '@/directives/v-click-outside';

export interface IUiMultiSelectProps {
	modelValue: Record<string, any>[];
	name: string;
	options: Record<string, any>[];
	keyProp?: string;
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
	keyProp: 'name',
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

const optionsCheck = ref(
	props.options.map(option => !!props.modelValue.map(value => value[props.keyProp]).includes(option[props.keyProp])),
);

const labelValue = computed((): string => {
	if (!props.modelValue.length) {
		return props.placeholder;
	}

	if (props.modelValue.length === 1) return props.modelValue[0][props.keyProp];

	return `${props.modelValue.length} выбрано`;
});

function change(newOption: Record<string, any>[]) {
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

function checkOptions(opt: Record<string, any>, index: number) {
	const res: Record<string, any>[] = [...props.modelValue];
	if (optionsCheck.value[index]) {
		res.push(opt);
	} else {
		res.splice(index - 1, 1);
	}
	change(res);
}

watch(
	() => props.options,
	() =>
		(optionsCheck.value = props.options.map(
			option => !!props.modelValue.map(value => value[props.keyProp]).includes(option[props.keyProp]),
		)),
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
		<ul
			v-show="isShowOptions"
			class="ui-multi-select__dropdown"
		>
			<li
				v-for="(opt, index) in props.options"
				class="ui-multi-select__item"
				:key="opt[props.keyProp]"
			>
				<UiCheckbox
					v-model="optionsCheck[index]"
					:name="`${opt[props.keyProp]}_${props.name}_site-option`"
					:label="opt[props.keyProp]"
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

		&.show-dropdown {
			svg {
				transform: rotate(180deg);
			}
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
