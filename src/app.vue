<template src="./app.template.html"></template>

<script>
    import {ApiFactory} from './api/ApiFactory';

    import CityControl from './components/city-control/CityControl.vue'
    import DatetimeControl from './components/datetime-control/DatetimeControl.vue'
    import AdvancedControl from './components/advanced-control/AdvancedControl.vue'

    const cityApi = ApiFactory.get('city');

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
                    showAdvancedBlock: true
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
            async getCityList () {
                const response = await cityApi.getList();
                this.data.states = response.data;
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
            send() {
                console.log(this.result);
            }
        },
    }
</script>