import {useState} from "react";
import styles from "./index.module.sass";
import king from "./king.jpeg";

const player = (name) => {
  return {
    name,
    count: 0,
  };
};

const App = () => {
  const [players, setPlayers] = useState([]);

  const isKing = (currentPlayer) => {
    setPlayers((prev) => {
      return prev.map((p) => {
        if (p.name === currentPlayer.name) {
          p.count++;
        }
        return p;
      });
    });
  };

  const isVictom = (currentPlayer) => {
    setPlayers((prev) => {
      return prev.map((p) => {
        if (p.name === currentPlayer.name) {
          p.count += 2;
        }
        return p;
      });
    });
  };

  const resetBy3 = (currentPlayer) => {
    setPlayers((prev) => {
      return prev.map((p) => {
        if (p.name === currentPlayer.name) {
          p.count -= 3;
          if (p.count < 0) p.count = 0;
        }
        return p;
      });
    });
  };

  const addPlayer = () => {
    let name = window.prompt("請輸入玩家名稱：");

    setPlayers((prev) => {
      return prev.concat(player(name));
    });
  };

  const PlayersGroup = () => {
    if (players.length === 0) return <div className={styles.empty}>目前無玩家...</div>;

    return (
      <div className={styles.group}>
        {players.map((p) => {
          return (
            <div className={styles.player} key={p.name}>
              <div className={styles.title}>
                <div className={styles.name}>{p.name}</div>
                <div className={styles.count}>
                  累積點數：<span>{p.count}</span>
                </div>
              </div>
              <div className={styles.buttons}>
                <button onClick={() => isKing(p)}>被抽到國王！</button>
                <button onClick={() => isVictom(p)}>被抽到受害者！</button>
                <button onClick={() => resetBy3(p)}>使用能力！</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="App">
      <header className={styles.header}>
        <img src={king} alt="king" />
        <h1>麻吉杯第 X 屆國王遊戲</h1>
      </header>
      <section className={styles.main}>
        <PlayersGroup />
        <button className={styles.add} onClick={addPlayer}>
          新增玩家
        </button>
      </section>
      <section className={styles.rules}>
        <ul>
          <li>每次被選中的三位玩家皆須喝一杯</li>
          <li>每三次被抽中的玩家就能獲得以下權力，擇一：</li>
          <ol>
            <li>
              <b>三人行</b>：有三杯 shot 的扣打，可以平均給其他三人喝，或是灌給單一個人一次喝掉
            </li>
            <li>
              <b>王之手</b>：先 shot 1 杯，下一輪直接成為當國王
            </li>
            <li>
              <b>死之手</b>：先 shot 1 杯，下一輪直接指派一名受害者
            </li>
            <li>
              <b>獻身</b>：下一輪直接指名自己與另一位受害者（角色自訂）
            </li>
          </ol>
        </ul>
      </section>
    </div>
  );
};

export default App;
