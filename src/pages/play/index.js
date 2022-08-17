// import '@/App.css';
import { useEffect, useRef } from 'react';
import player from 'rrweb-player';
import 'rrweb-player/dist/style.css';

let playerInstance = null;
let events;
function getRecords() {
    const evs = JSON.parse(localStorage.getItem('rrweb_events')) || [];
    localStorage.removeItem('rrweb_events');
    events = evs.reverse().flat();
}
function playBack(target) {
    if (!playerInstance) {
        if (events.length === 0) {
            return;
        }
        playerInstance = new player({
            target, // 可以自定义 DOM 元素
            // 配置项
            props: {
                width: 375,
                events,
                showController: true
            },
        });
    } else {
        playerInstance.play();
    }
}
export default function App() {
    const playerContainer = useRef();
    useEffect(() => {
        getRecords();
        playerInstance = null;
    }, []);
    return (
        <div>
            <button onClick={() => playBack(playerContainer.current)}>播放</button>
            <div ref={playerContainer}></div>
        </div>
    );
}
