<template src="./CityControl.template.html"></template>

<script>
    export default {
        name: 'city-control',
        props: ['placeholder', 'data', 'instance'],
        data () {
            return {
                result: [],
                value: ''
            }
        },
        methods: {
            search() {
                this.result = [];

                if (!this.value) return;

                const regExp = new RegExp(this.value, 'i');

                for (let state in this.data) {
                    this.data[state].map(cityName => {
                        if (regExp.test(cityName)) {
                            this.result.push(cityName);
                        }
                    });
                }

                this.$emit(`${this.instance}Change`, this.value);
            },
            setValue(value) {
                this.value = value;
                this.result = [];

                this.$emit(`${this.instance}Change`, this.value);
            },
            clearValue() {
                this.value = '';
                this.result = [];
            }
        }
    }
</script>