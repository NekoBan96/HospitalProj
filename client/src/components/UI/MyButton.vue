<template>
    <button class="button-39 bg-[#125379] hover:bg-[#274a5f] transition-all duration-200 font-body" role="button">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'MyButton'
}
</script>

<style scoped>
.button-39 {
    /* background-color: #FFFFFF; */
    border: 1px solid rgb(209, 213, 219);
    border-radius: .5rem;
    box-sizing: border-box;
    color: #111827;
    font-size: 1rem;
    line-height: 1.25rem;
    padding: .75rem 1rem;
    text-align: center;
    text-decoration: none #D1D5DB solid;
    text-decoration-thickness: auto;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    font-weight: bold;
    color: white
}


.button-39:active {
    outline: 2px solid transparent;
    background-color: rgb(212, 212, 212);
    outline-offset: 2px;
}

.button-39:focus-visible {
    box-shadow: none;
}
</style>