<script lang="ts">
  import { Temporal } from "temporal-polyfill";
  import { formatZoned, formatZonedInternational } from "./lib/util";

  const localTimezone = Temporal.Now.timeZoneId();
  const utcTimezone = "Etc/GMT";

  let waitDayAnswer = 0;
  let waitTimeAnswer = "00:00:00";

  let localSceduleDate = "";

  function resultScheduleDate() {
    const waitTime = Temporal.PlainTime.from(waitTimeAnswer);
    const duration = Temporal.Duration.from({
      days: waitDayAnswer,
      hours: waitTime.hour,
      minutes: waitTime.minute,
      seconds: waitTime.second,
    });
    let scheduleDate = Temporal.Now.zonedDateTimeISO();
    scheduleDate = scheduleDate.add(duration);
    localSceduleDate = formatZoned(scheduleDate);
  }

  //ここから現地時間⇔UTC =======================================

  type ConvertOption = {
    label: string;
    fromTimeZone: string;
    ToTimeZone: string;
  };

  const localToUTCConvertOption: ConvertOption = {
    label: "現地時間→UTC",
    fromTimeZone: localTimezone,
    ToTimeZone: utcTimezone,
  };
  const UTCToLocalConvertOption: ConvertOption = {
    label: "UTC→現地時間",
    fromTimeZone: utcTimezone,
    ToTimeZone: localTimezone,
  };

  let CurrentConvertOption: ConvertOption = localToUTCConvertOption;
  let originalDateTime = formatZonedInternational(
    Temporal.Now.zonedDateTimeISO(),
  );
  let convertedDateTime = "";

  function inversion() {
    if (CurrentConvertOption === localToUTCConvertOption) {
      CurrentConvertOption = UTCToLocalConvertOption;
    } else {
      CurrentConvertOption = localToUTCConvertOption;
    }
  }

  function convert() {
    const dateTime = Temporal.PlainDateTime.from(originalDateTime);
    const originalPlainDateTimeZoned = Temporal.ZonedDateTime.from({
      year: dateTime.year,
      month: dateTime.month,
      day: dateTime.day,
      hour: dateTime.hour,
      minute: dateTime.minute,
      second: dateTime.second,
      timeZone: CurrentConvertOption.fromTimeZone,
    });
    convertedDateTime = formatZoned(
      originalPlainDateTimeZoned.withTimeZone(CurrentConvertOption.ToTimeZone),
    );
  }
</script>

<svelte:head>
  <title>某雪国ゲーム用ツール</title>
</svelte:head>

<main>
  <form>
    <h1>残り時間→予定日時</h1>
    <label>
      <span>残り日数</span>
      <input type="number" bind:value={waitDayAnswer} min="0" step="1" />
    </label>
    <label>
      <span>残り時間</span>
      <input type="time" bind:value={waitTimeAnswer} step="1" />
    </label>
    <button type="button" on:click={resultScheduleDate}>変換</button>
    <p class="result-card">予定日時(現地時刻): {localSceduleDate}</p>
  </form>
  <hr />
  <form>
    <h1>現地時刻⇔UTC変換</h1>
    <div>
      <div>
        <label for="original-datetime-input">
          <span>{CurrentConvertOption.label}</span>
          <button type="button" on:click={inversion} class="convert-button"
            >反転</button
          >
        </label>
        <input
          id="original-datetime-input"
          type="datetime-local"
          bind:value={originalDateTime}
          step="1"
        />
      </div>
    </div>
    <button type="button" on:click={convert}>変換</button>
    <p class="result-card">変換後日時: {convertedDateTime}</p>
  </form>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: min(450px, 100%);
    margin-inline: auto;
    height: 100%;
    padding: 3px 7px;
  }
  main form {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  main form input {
    width: 100%;
  }

  h1 {
    display: inline-block;
    position: relative;
    margin-bottom: 1rem;
  }
  h1::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 5px;
    background-color: #f7f7f7;
    bottom: 0px;
    left: 0px;
  }

  button {
    background-color: #f7f7f7;
    border-radius: 5px;
    background-color: #3535bd;
    color: white;
    font-weight: bold;
  }

  .result-card {
    margin-top: 10px;
    border: #f7f7f7 solid 1px;
    padding: 3px 7px;
    border-radius: 5px;
  }

  .convert-button {
    background-color: #637ffc;
  }
</style>
