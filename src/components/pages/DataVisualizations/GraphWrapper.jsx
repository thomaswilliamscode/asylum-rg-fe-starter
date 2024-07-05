import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

    const baseUrl = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    const fiscal = '/fiscalSummary';
    const citizenship = '/citizenshipSummary';
    let url = `${baseUrl}${fiscal}`;

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();

  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  async function axiosCall(params) {
    const baseUrl = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    const fiscal = '/fiscalSummary';
    const citizenship = '/citizenshipSummary';
    let url = `${baseUrl}${fiscal}`;
    let dataArray = [];
    let dataObj = {};

    const fiscalData = await axios.get(url, {
      params: {
        from: params.start,
        to: params.end
      },
    })
      .then( (res) => {
        dataObj = res.data;
        return res.data;
      })
      .catch( (err) => {
        console.log(err.message);
        return err.message;
      });
      url = `${baseUrl}${citizenship}`;
    const citizenData = await axios
      .get(url, {
        params: {
          from: params.start,
          to: params.end,
        },
      })
      .then(res => {
        dataObj.citizenshipResults = res.data;
        return res.data;
      })
      .catch(err => {
        console.log(err.message);
        return err.message;
      });

      dataArray.push(dataObj);
      return dataArray;
  }

  async function updateStateWithNewData(years, view, office, stateSettingCallback) {
    /*
          _                                                                             _
        |                                                                                 |
        |   Example request for once the `/summary` endpoint is up and running:           |
        |                                                                                 |
        |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
        |                                                                                 |
        |     so in axios we will say:                                                    |
        |                                                                                 |     
        |       axios.get(`${url}/summary`, {                                             |
        |         params: {                                                               |
        |           from: <year_start>,                                                   |
        |           to: <year_end>,                                                       |
        |           office: <office>,       [ <-- this one is optional! when    ]         |
        |         },                        [ querying by `all offices` there's ]         |
        |       })                          [ no `office` param in the query    ]         |
        |                                                                                 |
          _                                                                             _
                                   -- Mack 
    
    */

    //call both urls, combine data, grab data for what is needed

    if (office === 'all' || !office) {
      let params = { start: years[0], end: years[1]};
      let result = await axiosCall(params);
      if (view === 'time-series') {
        stateSettingCallback(view, office, result);
      } else {
        stateSettingCallback(view, office, result);
      }
    } else {
      let params = { start: years[0], end: years[1], office: office };
      let result = await axiosCall(params);
      if (view === 'time-series') {
        stateSettingCallback(view, office, result);
      } else {
        stateSettingCallback(view, office, result);
      }
    }
  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
