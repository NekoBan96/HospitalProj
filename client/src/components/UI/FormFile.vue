<template>
    <form method="post" enctype="multipart/form-data">
        <label class="input-file">
            <input type="file" name="file" @change="updateValue">
            <span>Выберите файл</span>
        </label>
    </form>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'FormFile',
    setup() {
        const modelValue = ref('');

        const updateValue = (event) => {
            modelValue.value = event.target.files[0];
        };

        return {
            modelValue,
            updateValue
        };
    }
}
</script>
<style scoped>
.input-file {
    position: relative;
    display: inline-block;
}

.input-file span {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    text-decoration: none;
    font-size: 14px;
    vertical-align: middle;
    color: rgb(255 255 255);
    text-align: center;
    border-radius: 15px;
    background-color: #125379;
    line-height: 22px;
    height: 40px;
    padding: 10px 20px;
    box-sizing: border-box;
    border: none;
    margin: 0;
    transition: background-color 0.2s;
}

.input-file input[type=file] {
    position: absolute;
    z-index: -1;
    opacity: 0;
    display: block;
    width: 0;
    height: 0;
}

.input-file input[type=file]:focus+span {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
}

.input-file:hover span {
    background-color: #274a5f;
}

.input-file:active span {
    background-color: #274a5fd3;
}

.input-file input[type=file]:disabled+span {
    background-color: #eee;
}
</style>