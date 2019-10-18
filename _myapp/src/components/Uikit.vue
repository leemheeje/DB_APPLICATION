<template>
<div class="input_fuild" v-if="type !== 'checkbox' || type !== 'radio' || type !== 'textarea'">
	<label :for="id">{{label}}</label>
	<div class="input-group">
		<input :type="type" class="form-control" :class="cssClass" :id="id" :placeholder="placeholder" :title="title" :required="required" :value="value" @input="updateValue($event.target.value)">
		<div class="invalid-feedback" style="width: 100%;">
			'{{label}}'을(를) 입력해주세요.
		</div>
	</div>
</div>
<div class="input_fuild" v-else>
</div>
</template>
<script>
export default {
	props: ['type', 'id', 'title', 'placeholder', 'required', 'cssClass', 'label', 'minlength', 'maxlength', 'user_id','value'],
	methods: {
        updateValue(t){
            this.$emit('input' , t);
        }
	}

}
</script>
<style scoped=""></style>