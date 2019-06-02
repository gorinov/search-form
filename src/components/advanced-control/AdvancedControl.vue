<template src="./AdvancedControl.template.html"></template>

<script>
    import {ApiFactory} from './../../api/ApiFactory';

    const carApi = ApiFactory.get('car');

    export default {
        name: 'advanced-control',
        data () {
            return {
                data: {
                    brand: [],
                    models: []
                },
                selectedCarBrandIndex: null,
                carBrand: '',
                carModel: '',
                value: ''
            }
        },
        created() {
            this.getCarList();
        },
        methods: {
            setCarBrandIndex() {
                this.selectedCarBrandIndex = this.data.brand.indexOf(this.carBrand);
            },
            async getCarList () {
                const response = await carApi.getList();
                const cars = response.data;

                this.data.brand = cars.map(item => item.brand);
                this.data.models = cars.map(item => item.models);
            },
        }
    }
</script>