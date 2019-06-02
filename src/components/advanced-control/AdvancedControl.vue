<template src="./AdvancedControl.template.html"></template>

<script>
    import {ApiFactory} from './../../services/api/ApiFactory';

    export default {
        name: 'advanced-control',
        data () {
            return {
                data: {
                    brands: [],
                    models: []
                },
                selectedCarBrandIndex: null,
                carBrand: '',
                carModel: '',
                discountCode: ''
            }
        },
        created() {
            this.getCarList();
        },
        methods: {
            setCarBrandIndex() {
                if (this.carBrand) {
                    const index = this.data.brands.indexOf(this.carBrand);

                    if (this.selectedCarBrandIndex != index) {
                        this.selectedCarBrandIndex = index;
                        this.carModel = '';
                    }
                } else {
                    this.selectedCarBrandIndex = null
                }

                if (this.selectedCarBrandIndex === null){
                    this.carModel = '';
                }
            },
            async getCarList () {
                const dataApi = ApiFactory.get('data');
                const response = await dataApi.getCarsList();

                try {
                    const cars = response.data;
                    this.data.brands = cars.map(item => item.brand);
                    this.data.models = cars.map(item => item.models);
                } catch (e) {
                    console.warn(e);
                }
            }
        }
    }
</script>