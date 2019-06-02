<template src="./DatetimeControl.template.html"></template>

<script>
    import flatPickr from 'vue-flatpickr-component';

    export default {
        name: 'datetime-control',
        props: ['instance', 'dateUp', 'dateOff'],
        components: {
            flatPickr
        },
        data () {
            return {
                result: [],
                value: '',
                date: new Date(),
                time: '05:30',
                dateConfig: {
                    altFormat: 'm/d/Y',
                    altInput: true,
                    dateFormat: 'm/d/Y',
                    minDate: new Date(),
                    defaultHour: 0,
                    defaultMinute: 0,
                    onChange: this.onChangeDate
                },
                timeConfig: {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i"
                }
            }
        },
        created () {
            if (this.instance === 'off') {
                this.time = '10:30';
            }

            this.$emit(`onChangeDate`, {
                date: this.date,
                time: this.time,
                instance: this.instance
            });
        },
        watch: {
            // обновление даты окончания
            dateUp: function minDate() {
                const minDate = this.dateUp;

                if (typeof this.date != Date) {
                    this.date = new Date(this.date);
                }

                if (this.date < minDate) {
                    this.date = minDate;
                }

                this.$set(this.dateConfig, 'minDate', minDate);
            }
        },
        methods: {
            onChangeDate(date) {
                this.$emit(`onChangeDate`, {
                    date: date[0],
                    time: this.time,
                    instance: this.instance
                });
            }
        }
    }
</script>