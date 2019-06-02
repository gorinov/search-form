<template src="./app.template.html"></template>

<script>
    import {ApiFactory} from './services/api/ApiFactory';

    import CityControl from './components/city-control/CityControl.vue'
    import DatetimeControl from './components/datetime-control/DatetimeControl.vue'
    import AdvancedControl from './components/advanced-control/AdvancedControl.vue'

    export default {
        name: 'sf',
        components: {
            CityControl,
            DatetimeControl,
            AdvancedControl
        },
        data () {
            return {
                data: {
                    states: []
                },
                params: {
                    showAdvancedBlock: true,
                    loading: false
                },
                result: {
                    pickUpCity: '',
                    dropOffCity: '',
                    pickUpDate: new Date(),
                    dropOffDate: new Date(),
                    pickUpTime: '',
                    dropOffTime: ''
                }
            }
        },
        created () {
            this.getCityList();
        },
        methods: {
            onChangeAdvanced(data) {
                this.result = Object.assign(this.result, data);
            },
            onChangeCity(data) {
                if (data.instance == 'up') {
                    this.result.pickUpCity = data.city;
                }
                if (data.instance == 'off') {
                    this.result.dropOffCity = data.city;
                }
            },
            onChangeDate(data) {
                if (data.instance == 'up') {
                    this.result.pickUpDate = data.date;
                    this.result.pickUpTime = data.time;
                }
                if (data.instance == 'off') {
                    this.result.dropOffDate = data.date;
                    this.result.dropOffTime = data.time;
                }
            },
            async getCityList () {
                const dataApi = ApiFactory.get('data');
                const response = await dataApi.getCityList();

                try {
                    this.data.states = response.data;
                } catch (e) {
                    console.warn(e);
                }
            },
            async send() {
                if (this.params.loading){
                    return false;
                }

                console.log('Отправлено', this.result);
                this.params.loading = true;

                const searchApi = ApiFactory.get('request');
                const response = await searchApi.find(this.result);

                try {
                    this.params.loading = false;

                    const items = response.data.data.items;
                    const itemsCount = items.length;

                    if (itemsCount) {
                        alert(`Найдено ${itemsCount} предложение`);
                    } else {
                        alert(`Предложений не найдено, Вы можете изменить параметры поиска`);
                    }
                } catch (e) {
                    console.warn(e);
                }
            }
        },
    }
</script>