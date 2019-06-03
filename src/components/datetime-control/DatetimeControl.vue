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
        computed: {
            selectedDate() {
                let date = this.date;

                if (date instanceof Date === false) {
                    date = new Date(date);
                }

                date.setMilliseconds(0);

                return date;
            },
            minDate() {
                let date = this.pickUpDate;

                if (date instanceof Date === false) {
                    date = new Date(date);
                }

                date.setMilliseconds(0);

                return date;
            }
        },
        watch: {
            // обновление даты окончания
            pickUpDate() {
                if (!this.date || !this.pickUpDate) {
                    return;
                }

                if (this.date instanceof Date === false) {
                    this.date = new Date(this.date);
                }

                if (this.date < this.minDate) {
                    this.date = this.minDate;
                }

                this.$set(this.dateConfig, 'minDate', this.minDate);
            },
            // обновление времени окончания
            pickUpTime() {
                if (!this.date || !this.pickUpDate) {
                    return;
                }

                if (this.selectedDate > this.minDate) { // если день не совпадает, пропускаем
                    return;
                }

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