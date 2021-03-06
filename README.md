# taky-billing-schedule

# install

using [npm](https://npmjs.org)

```
npm i taky-billing-schedule --save
```

# example

``` coffeescript
Cycle = require 'taky-billing-schedule'

cycle = new Cycle {
  cycle_seconds_human: '30 days'
  trial_seconds_human: '7 days'
  cycle_amount_dollars: '9.99'
  initial_amount_dollars: '12.00'
  initial_method: 'charge'
  after_trial_method: 'charge'
  after_trial_amount_dollars: '100'
  max_cycles: 0
}

console.log cycle.next 10

###
[ { time: 1442350122,
    date: Tue Sep 15 2015 16:48:42 GMT-0400 (EDT),
    action: 'charge',
    reason: 'initial_method',
    amount_cents: 1200,
    amount_dollars: '12.00' },
  { time: 1442954922,
    date: Tue Sep 22 2015 16:48:42 GMT-0400 (EDT),
    action: 'charge',
    reason: 'after_trial',
    amount_cents: 10000,
    amount_dollars: '100.00' },
  { time: 1442954922,
    date: Tue Sep 22 2015 16:48:42 GMT-0400 (EDT),
    action: 'charge',
    reason: 'cycle_0',
    amount_cents: 999,
    amount_dollars: '9.99' },
  { time: 1445546922,
    date: Thu Oct 22 2015 16:48:42 GMT-0400 (EDT),
    action: 'charge',
    reason: 'cycle_1',
    amount_cents: 999,
    amount_dollars: '9.99' },
  { time: 1448138922,
    date: Sat Nov 21 2015 15:48:42 GMT-0500 (EST),
    action: 'charge',
    reason: 'cycle_2',
    amount_cents: 999,
    amount_dollars: '9.99' },
  { time: 1450730922,
    date: Mon Dec 21 2015 15:48:42 GMT-0500 (EST),
    action: 'charge',
    reason: 'cycle_3',
    amount_cents: 999,
    amount_dollars: '9.99' },
...
###
```

## .humanize()
return cycle properties with human-friendly properties

## .next(num_items=1,options={})
generate the next *num_items* scheduled items based on the cycle properties and options
object provided

``` coffeescript
opts =
  ctime: 1442289600  # unix time cycle was started
  max_time: null     # optional unix time to limit the results at
  last_success: null # last unix time a successful billing occurred
  skip_ranges: null  # array of time-ranges to exclude, [min,max]
  cycles_only: true  # only return primary billing cycles

next_bill = _.first(cycle.next 10, opts)
console.log next_bill

###
{ time: 1442894400,
  date: Tue Sep 22 2015 00:00:00 GMT-0400 (EDT),
  action: 'charge',
  reason: 'cycle_0',
  amount_cents: 999,
  amount_dollars: '9.99' }
###
```

