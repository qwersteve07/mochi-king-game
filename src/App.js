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

  const getPower = (currentPlayer) => {
    setPlayers((prev) => {
      return prev.map((p) => {
        if (p.name === currentPlayer.name) {
          if (p.count < 3) {
            alert("你想幹嘛！壞壞！");
            return p;
          }
          p.count -= 3;
          if (p.count < 0) p.count = 0;
        }
        return p;
      });
    });
  };

  const addPlayer = () => {
    let name = window.prompt("請輸入玩家名稱：");

    if (!name) return;

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
                <button className={styles.king} onClick={() => isKing(p)}>
                  被抽到國王！
                </button>
                <button className={styles.victom} onClick={() => isVictom(p)}>
                  被抽到受害者！
                </button>
                <button className={styles.power} onClick={() => getPower(p)}>
                  使用能力！
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={king} alt="king" />
        <h1>麻吉杯第 ? 屆國王遊戲</h1>
      </header>
      <section className={styles.main}>
        <PlayersGroup />
        <button className={styles.add} onClick={addPlayer}>
          新增玩家
        </button>
      </section>
      <section className={styles.rules}>
        <ul>
          <li>
            每次被<mark>選中</mark>的玩家皆須喝一杯（包含下述特殊能力的動作）
          </li>
          <li>
            每次被<mark>選中</mark>時，都會依照被抽到的位置增加點數
          </li>
          <li>只要累積至三點，在國王遊戲回合結束後，玩家就能選擇以下能力：</li>
          <ol>
            <li>
              <b>暢飲</b>：有三杯 shot 的扣打，可以平均給其他三人喝，或是灌給單一個人一次喝掉
            </li>
            <li>
              <b>單挑</b>：指定一位玩家展開決鬥（規則自訂），獲勝的話強制對方喝 2 杯
            </li>
            <li>
              <b>詛咒</b>：指定一位玩家，永久性的在被<mark>選中</mark>時需再多喝一杯
            </li>
            <li>
              <b>王之手</b>：shot 1 杯，下一輪直接成為國王
            </li>
            <li>
              <b>死之手</b>：shot 1 杯，下一輪直接<mark>選中</mark>一名受害者
            </li>
            <li>
              <b>民之手</b>：下一輪透過除自己以外的人<mark>選中</mark>一位受害者
            </li>
            <li>
              <b>命運</b>：shot 1 杯，下一輪的國王遊戲結果出來時可交換國王與一位受害者的位置（點數累計計算於調動之後）
            </li>
            <li>
              <b>獻身</b>：除自己以外，所有人都 shot 1 杯，下一輪直接指名自己與<mark>選中</mark>一位受害者（角色自訂）
            </li>
          </ol>
          <li>
            同時有多個玩家發動能力時，以發動時間做排序，不可覆蓋上一個能力的結果（能力<b>獻身</b>為例外）
          </li>
          <li>
            <b>Serena 條款</b>：由於 Serena 一喝酒就會變身為嗜睡巨獸，因此任一時刻 Serena
            被指定要喝酒時，由當前點數最少的人來代替（若點數相同，則猜拳決定 ）
          </li>
        </ul>
      </section>
    </div>
  );
};

export default App;
