import {
  faVideo,
  faVideoSlash,
  faVolumeMute,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Progress } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useHistory } from "react-router";
import ButtonField from "../../components/ButtonField";
import VideoPreview from "../../components/VideoPreview";
import {
  Constants,
  DATE_FORMAT,
  MAXIMUM_WORKING_TIME,
  MONTH_FORMAT
} from "../../constants/Constants";
import { getImage } from "../../services/AssertService";
import { getUserInfo, updateUserInfo, uploadFIle } from "../../services/FirebaseService";
import { isIOSVersion } from "../../services/PlatformService";
import {
  StatisticDayItem,
  StatisticMonthItem,
  UserInfo
} from "../../share/Type";
import { buildNotificatioMessage } from "./Service";
import { HomeWrapper } from "./Style";

export interface IState {
  count: number;
  isAudioOn: boolean;
  isVideoOn: boolean;
  playAudio: boolean;
  relaxPlayAudio: boolean;
  startExcercise: boolean;
  percent: number;
  isStarted: boolean;
  isPermissionAllow: boolean;
  isDisableVideoButton: boolean;
  isActivateRecording: boolean;
}
const audio = new Audio("/mp3/hit_nguc_bung_no.mp3");
const audioRelax = new Audio("/mp3/thu_gian.mp3");
var timeout: NodeJS.Timeout;
var waitingtimeout: NodeJS.Timeout;

const activeRecordingMessage = () => buildNotificatioMessage('Bật quay video');
const disableRecordingMessage = () => buildNotificatioMessage('Tắt quay video');
const startRecordingMessage = () => buildNotificatioMessage('Bắt đầu quay video');
const endRecordingMessage = () => buildNotificatioMessage('Kết thúc quay video');

const Home = ({ email, logoutHandler }: { email: string, logoutHandler: Function }) => {
  const history = useHistory();
  const [state, setState] = useState<IState>({
    isAudioOn: true,
    isVideoOn: true,
    playAudio: false,
    relaxPlayAudio: false,
    startExcercise: false,
    percent: 0,
    count: 0,
    isStarted: false,
    isPermissionAllow: false,
    isDisableVideoButton: false,
    isActivateRecording: false,
  });
  const isNotIosVersion = !isIOSVersion();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [seconds, setSeconds] = useState<number>(MAXIMUM_WORKING_TIME);
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true, audio: false });

  useEffect(() => {
    async function getBlobUrl(url:string) {
      let response = await fetch(url);
      return await response.blob();
    }
    console.log("run json media blob", mediaBlobUrl);
    
   if (mediaBlobUrl && state.isPermissionAllow) {
    getBlobUrl(mediaBlobUrl).then(data => {
      if (user) {
        uploadFIle(data, user.email);
      }
    })
   }
  }, [mediaBlobUrl])

  useEffect(() => {
    if (state.isDisableVideoButton && state.isActivateRecording && state.isPermissionAllow) {
      startRecordingMessage();
      startRecording();
    }
  }, [state.isDisableVideoButton])

  useEffect(() => {
    async function getUser() {
      let response = await getUserInfo(email);
      setUser(response);
    }
    getUser();
  }, [email]);

  useEffect(() => {
    if (state.playAudio) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [state.playAudio]);

  useEffect(() => {
    if (state.startExcercise) {
      if (seconds > 0) {
        timeout = setTimeout(() => {
          let newValue = seconds - 1;
          setSeconds(newValue);
          setState((prev) => ({
            ...prev,
            percent: ((MAXIMUM_WORKING_TIME - newValue) * 100) / MAXIMUM_WORKING_TIME,
          }));
        }, 1000);
      } else {
        setSeconds(MAXIMUM_WORKING_TIME);
        setState((prev) => ({
          ...prev,
          count: prev.count + 1,
          percent: 0,
        }));
        audio.currentTime = 0;
        audio.play();
      }
    } 
  }, [state.startExcercise, seconds]);

  const handleVideoStatus = () => {
    if (state.isPermissionAllow) {
      if (state.isActivateRecording) {
        disableRecordingMessage();
      } else {
        activeRecordingMessage();
      }
      setState((prev) => ({
        ...prev,
        isActivateRecording: !prev.isActivateRecording,
      }));
    }
  };

  const handleAudioStatus = () => {
    audio.muted = state.isAudioOn;
    setState((prev) => ({
      ...prev,
      isAudioOn: !prev.isAudioOn,
    }));
  };

  const updateUserWorkingTime = (workingCount: number) => {
    if (workingCount === 0) {
      return;
    }
    let date = new Date();
    let dayMoment = moment().format(DATE_FORMAT);
    let monthMoment = moment().format(MONTH_FORMAT);

    let newStatistic = user?.statistic;
    if (!newStatistic) {
      newStatistic = [];
    }
    let session =
      Math.floor(workingCount / 10) === 0 ? 0 : Math.floor(workingCount / 10);
    let yearUnit = newStatistic.find(
      (item) => item.year === date.getFullYear()
    );
    var monthUnit: StatisticMonthItem = {
      month: "",
      totalInMonth: 0,
      totalMonthSession: 0,
      dates: [],
    };
    var dayUnit: StatisticDayItem = {};

    if (!yearUnit) {
      dayUnit = {
        day: dayMoment,
        totalInDay: workingCount,
        totalDaySession: session,
      };

      monthUnit = {
        month: monthMoment,
        totalInMonth: workingCount,
        totalMonthSession: session,
        dates: [],
      };

      yearUnit = {
        year: date.getFullYear(),
        totalInYear: workingCount,
        totalYearSession: session,
        months: [],
      };
    } else {
      if (!yearUnit?.months?.find((item) => item.month === monthMoment)) {
        dayUnit = {
          day: dayMoment,
          totalInDay: workingCount,
          totalDaySession: session,
        };

        monthUnit = {
          month: monthMoment,
          totalInMonth: workingCount,
          totalMonthSession: session,
          dates: [],
        };
        yearUnit.totalInYear = yearUnit.totalInYear + workingCount;
        yearUnit.totalYearSession = yearUnit.totalYearSession + session;
      } else {
        monthUnit = yearUnit!.months!.find(
          (item) => item.month === monthMoment
        )!;

        if (!monthUnit?.dates?.find((item) => item.day === dayMoment)) {
          dayUnit = {
            day: dayMoment,
            totalInDay: workingCount,
            totalDaySession: session,
          };
        } else {
          dayUnit = monthUnit!.dates!.find((item) => item.day === dayMoment)!;
          dayUnit.totalInDay = dayUnit!.totalInDay! + workingCount;
          dayUnit.totalDaySession = dayUnit!.totalDaySession! + session;
        }
        monthUnit.totalInMonth = monthUnit.totalInMonth + workingCount;
        monthUnit.totalMonthSession = monthUnit.totalMonthSession + session;
        yearUnit.totalInYear = yearUnit.totalInYear + workingCount;
        yearUnit.totalYearSession = yearUnit.totalYearSession + session;
      }
    }

    if (yearUnit && monthUnit && dayUnit) {
      if (monthUnit.dates.find((item) => item.day === dayUnit.day)) {
        monthUnit.dates = monthUnit.dates.map((item) => {
          if (item.day === dayUnit?.day) {
            item.totalDaySession = dayUnit.totalDaySession;
            item.totalInDay = dayUnit.totalInDay;
          }
          return item;
        });
      } else {
        monthUnit.dates.push(dayUnit);
      }

      if (yearUnit.months.find((item) => item.month === monthUnit.month)) {
        yearUnit.months = yearUnit.months.map((item) => {
          if (item.month === monthUnit?.month) {
            item.totalInMonth = monthUnit.totalInMonth;
            item.totalMonthSession = monthUnit.totalMonthSession;
          }
          return item;
        });
      } else {
        yearUnit.months.push(monthUnit);
      }

      if (newStatistic.find((item) => item.year === yearUnit?.year)) {
        newStatistic = newStatistic.map((item) => {
          if (item.year === yearUnit?.year) {
            item.totalInYear = yearUnit.totalInYear;
            item.totalYearSession = yearUnit.totalYearSession;
          }
          return item;
        });
      } else {
        newStatistic.push(yearUnit);
      }
    }
    if (user) {
      let newUser = {
        ...user,
        statistic: newStatistic,
      };
      setUser(newUser);
      updateUserInfo(newUser);
    }
  };

  const stopExercise = () => {
    audioRelax.pause();
    audioRelax.currentTime = 0;
    updateUserWorkingTime(state.count);
    setSeconds(MAXIMUM_WORKING_TIME);
    if (state.isPermissionAllow && state.isDisableVideoButton && state.isActivateRecording) {
      endRecordingMessage();
      stopRecording();
    }
    if (timeout) clearTimeout(timeout);
    if (waitingtimeout) clearTimeout(waitingtimeout);
    setState((prev) => ({
      ...prev,
      startExcercise: false,
      count: 0,
      playAudio: false,
      isAudioOn: true,
      isVideoOn: true,
      percent: 0,
      isStarted: false,
      isDisableVideoButton: false,
      isActivateRecording: false,
    }));
  };

  const startExercise = () => {
    audioRelax.play();
    setState((prev) => ({
      ...prev,
      isStarted: true,
      isDisableVideoButton: true,
    }));
    waitingtimeout = setTimeout(() => {
      audio.play();
      setState((prev) => ({
        ...prev,
        startExcercise: true,
        playAudio: true,
      }));
    }, 6000);
  };

  const permissionChangeHandler = (bool: boolean) => {
    setState((prev) => ({
      ...prev,
      isPermissionAllow: bool,
    }));
  }

  const logout = () => {
    localStorage.removeItem(Constants.EMAIL);
    localStorage.removeItem(Constants.IS_LOGIN_SUCCESS);
    sessionStorage.removeItem(Constants.IS_LOGIN_SUCCESS);
    logoutHandler();
    history.push("/login");
  }

  return (
    <HomeWrapper>
      <div
        className={`video_section ${
          state.startExcercise && isNotIosVersion ? "" : "d-none"
        }`}
      >
        <VideoPreview
          allowPermisisonStatusChangeHandler={permissionChangeHandler}
        />
      </div>
      <div className="header">
        <img src={getImage("nen_tap_tho.jpeg")} alt="nen_tap_tho" />
        <div className="title">
          <div>LUYỆN THỞ 4 THỜI</div>
          <div>CÓ KÊ MÔNG VÀ GIƠ CHÂN</div>
        </div>
      </div>

      <div className="body">
        <div className={`icon_section`}>
          <FontAwesomeIcon
            icon={state.isVideoOn ? faVideo : faVideoSlash}
            onClick={() => handleVideoStatus()}
            className={`${!state.isPermissionAllow ? "opacity_0" : ""} ${
              state.isDisableVideoButton ? "pointer-event-none" : ""
            }`}
          />
          <FontAwesomeIcon
            icon={state.isAudioOn ? faVolumeUp : faVolumeMute}
            onClick={() => handleAudioStatus()}
            className={`${state.startExcercise ? "" : "pointer-event-none"}`}
          />
        </div>

        <div className="content">
          <div className="header">
            <label>Giữ hơi hít thêm</label>
          </div>
          <div className="body">
            <label>Hít ngực bụng nở</label>{" "}
            <div className="image">
              <Progress
                type="circle"
                trailColor="lightgrey"
                percent={state.percent}
                showInfo={false}
                strokeColor="green"
              />
              <img src={getImage("logo_clb.png")} alt="logo_tap" />
            </div>
            <label>Thở không kiềm thúc</label>
          </div>
          <div className="footer">
            <label>Nghỉ nặng ấm thân</label>{" "}
          </div>
        </div>

        <div className="counter">
          <div className="counter_count">{state.count}</div>
          <div className="counter_time">
            <label>00:{seconds >= 10 ? seconds : `0${seconds}`}</label>
          </div>
        </div>

        <div className="button_section">
          <ButtonField
            label={`${state.isStarted ? "Kết thúc" : "Bắt đầu"}`}
            onClick={() => (state.isStarted ? stopExercise() : startExercise())}
          />
          <ButtonField
            label="Hướng dẫn tập"
            onClick={() => {
              window.open("https://youtu.be/xv_5hIFB8-8", "_blank");
            }}
            transparent={true}
          />
          <ButtonField
            label="Nhật ký"
            onClick={() => history.push("statistic")}
            transparent={true}
          />
          <ButtonField
            label="Đăng xuất"
            onClick={() => logout()}
            transparent={true}
          />
        </div>
      </div>
    </HomeWrapper>
  );
};

export default Home;
