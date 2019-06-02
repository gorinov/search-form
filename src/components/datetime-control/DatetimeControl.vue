<template src="./DatetimeControl.template.html"></template>

<script>
    import flatPickr from 'vue-flatpickr-component';

    export default {
        name: 'datetime-control',
        props: ['instance', 'pickUpDate', 'pickUpTime'],
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
                    dateFormat: "H:i",
                    onChange: this.onChangeTime
                }
            }
        },
        created () {
            if (this.instance === 'off') {
                this.time = '10:30';
            }

            this.$emit(`onChange`, {
                date: this.date,
                time: this.time,
                instance: this.instance
            });
        },
        watch: {
            // обновление даты окончания
            pickUpDate() {
                const minDate = this.pickUpDate;

                if (typeof this.date != Date) {
                    this.date = new Date(this.date);
                }

                if (this.date < minDate) {
                    this.date = minDate;
                }

                this.$set(this.dateConfig, 'minDate', minDate);
            },
            // обновление времени окончания
            pickUpTime() {
                if (Date.parse(`01/01/2011 ${this.time}`) < Date.parse(`01/01/2011 ${this.pickUpTime}`)) {
                    this.time = this.pickUpTime;
                }
            }
        },
        methods: {
            onChangeDate(dateObj) {
                const date = dateObj[0];

                this.$emit(`onChange`, {
                    date: date,
                    time: this.time,
                    instance: this.instance
                });
            },
            onChangeTime(dateObj) {
                const time = dateObj[0].toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: "numeric",
                    minute: "numeric"
                });

                this.$emit(`onChange`, {
                    date: this.date,
                    time: time,
                    instance: this.instance
                });
            }
        }
    }
</script>