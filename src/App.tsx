import { useState, useEffect } from 'react';
import { HiStatusOnline,HiStatusOffline } from "react-icons/hi";
import { GrView } from "react-icons/gr";
import './App.css';

function App() {
  const list: string[] = [
    'ESL_SC2',
    'OgamingSC2',
    'cretetion',
    'freecodecamp',
    'storbeck',
    'habathcx',
    'RobotCaleb',
    'noobs2ninjas',
  ];
  const [streams, setStreams] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = () => {
      let temp: any[] = [];
      for (const v of list) {
        fetch(`https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${v}`)
          .then((data) => data.json())
          .then((res) => {
            res.name = v;
            setStreams((prev) => [...prev, res]);
          });
      }
    };
    fetchData();
  }, []);
  const listing = streams.map((v, i) => {
    return v.stream ? (
      <li key={i} className="online">
        <p><a target={'_blank'} href={v?.stream?.channel?.url}>{v?.name} <GrView/></a></p>
        <p className='game'>{v?.stream?.game}</p>
        <p className="status"><HiStatusOnline/>online</p>
        <p className="on_status title">{v?.stream.channel.status}</p>
      </li>
    ) : (
      <li key={i} className="offline">
        <p>{v?.name}</p>
        <p></p>
        <p className="on_status"><HiStatusOffline/>offline</p>
      </li>
    );
  });
  return (
    <div className="App">
      <ul>{listing}</ul>
    </div>
  );
}

export default App;
