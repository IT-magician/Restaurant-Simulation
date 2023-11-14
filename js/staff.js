class Staff {
  #progress_status_idx = 0;
  #progress_status_names = ["대기"];
  #progress_status_waiting_times = [0];
  #current_progress_left_time = 0;
  #check_progress_status_interval = 1000;

  /**
   *
   * @param {object - '작업이름':'걸리는 시간'} progress_status_info
   */
  constructor(progress_status_info) {
    if (
      progress_status_info instanceof Object === false ||
      progress_status_info.length < 1
    )
      throw new Error(
        "Invalid Argument - the progress status names's type must be object (key-value array) type and the length is more than zero."
      );

    const progressCount = progress_status_info.length;

    this.#progress_status_names = Array(progressCount);
    this.#progress_status_waiting_times = Array(progressCount);

    let i = 0;
    for (const [progress_name, progress_waiting_time] of Object.entries(
      progress_status_info
    )) {
      this.#progress_status_names[i] = progress_name;
      this.#progress_status_waiting_times[i] = progress_waiting_time;
      i++;
    }
  }

  resetProgress() {
    this.#progress_status_idx = 0;
  }

  jumpCurrentProgress() {
    return (this.#progress_status_idx =
      ++this.#progress_status_idx % this.#progress_status_names.length);
  }

  /**
   *
   * @returns {Promise|int} promise 객체나, (완료시) 작업했던 단계를 반환한다.
   */
  async doCurrentProgress() {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        // if (progressLevel === 1) reject("대기상태에서는 아무 작업도 하지 않습니다.")
        this.jumpCurrentProgress();
        resolve(this.getCurrentProgressLevel());
      }, this.#progress_status_waiting_times[this.#progress_status_idx]);
    });

    const progressStatusInterval = getCheckProgressStatusInterval();
    const countDown = function () {
      const leftWaitingTime = Math.max(
        0,
        getCurrentProgressWaitingTime() - progressStatusInterval
      );
      setCurrentProgressWaitingTime(leftWaitingTime);

      return leftWaitingTime;
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // if (progressLevel === 1) reject("대기상태에서는 아무 작업도 하지 않습니다.")

        const leftWaitingTime = countDown();

        resolve([leftWaitingTime, progressLevel]);
      }, progressStatusInterval);
    });
  }

  getMaxProgressLevel() {
    return this.#progress_status_names.length;
  }

  /**
   *
   * @param {int} progress_level : 찾고자하는 이름의 작업단계를 전달한다.
   * @returns {string} : 전달받은 작업단계의 작업이름을 반환한다.
   */
  getProgressName(progress_level) {
    return this.#progress_status_names[progress_level];
  }

  getProgressLevel(progress_name) {
    return (
      this.#progress_status_names.findIndex((item) => item === progress_name) +
      1
    );
  }
  /**
   *
   * @returns {string}
   */
  getCurrentProgressName() {
    return this.#progress_status_names[this.#progress_status_idx];
  }

  /**
   *
   * @returns {int}
   */
  getCurrentProgressLevel() {
    return this.#progress_status_idx + 1;
  }

  setProgressWaitingTime(progress_level, waiting_time) {
    if (
      progress_level < 1 ||
      progress_level > this.#progress_status_names.length
    )
      throw new Error("OutBoundError : Out Of Progress Level Range.");

    //
    // if (waiting_time < 0)
    //     throw new Error("the waiting time must be from 0 to infinite.");

    this.#progress_status_waiting_times[progress_level - 1] = waiting_time;
  }

  getCheckProgressStatusInterval() {
    return this.#check_progress_status_interval;
  }

  setCheckProgressStatusInterval(milliseconds) {
    this.#check_progress_status_interval = milliseconds;
  }

  //   getCurrentProgressWaitingTime() {
  //     return this.#current_progress_left_time;
  //   }

  #setCurrentProgressWaitingTime(left_time) {
    this.#current_progress_left_time = left_time;
  }
}

class Cooker extends Staff {
  constructor() {
    super({
      대기중: 0 * 1000,
      요리중: -1,
    });
  }
}

class Waiter extends Staff {
  constructor(serving_work_time) {
    super({
      대기중: 0 * 1000,
      서빙: serving_work_time,
    });
  }
}

export { Cooker, Waiter };
