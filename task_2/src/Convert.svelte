<script lang="ts">
  import { onMount } from 'svelte';
  let fromCurrency = 'USD';
  let toCurrency = 'EUR';
  let fromAmount = 1;
  let toAmount = 0;
  let rates = {};

  const fetchRates = async (baseCurrency: string) => {
    const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    const data = await res.json();
    rates = data.rates;
  };

  const convertCurrency = (direction: string) => {
    if (direction === 'from') {
      toAmount = (fromAmount * rates[toCurrency]).toFixed(2);
    } else {
      fromAmount = (toAmount / rates[toCurrency]).toFixed(2);
    }
  };

  const handleInput = (event: Event, direction: string) => {
    const value = parseFloat((event.target as HTMLInputElement).value);
    if (direction === 'from') {
      fromAmount = value;
    } else {
      toAmount = value;
    }
    convertCurrency(direction);
  };

  onMount(async () => {
    await fetchRates(fromCurrency);
    convertCurrency('from');
  });
</script>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  input, select {
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  span {
    font-size: 1.2em;
    font-weight: bold;
    color: black
  }
</style>


<div>
  <input type="number" bind:value={fromAmount} on:input={(e) => handleInput(e, 'from')}>
  <select bind:value={fromCurrency}>
    {#each Object.keys(rates) as currency}
      <option>{currency}</option>
    {/each}
  </select>
  <span>=</span>
  <input type="number" bind:value={toAmount} on:input={(e) => handleInput(e, 'to')}>
  <select bind:value={toCurrency}>
    {#each Object.keys(rates) as currency}
      <option>{currency}</option>
    {/each}
  </select>
</div>
