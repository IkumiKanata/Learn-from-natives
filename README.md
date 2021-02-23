# Learn from Natives
![sss.red-miso.work](https://github.com/uechikohei/SkateSpotSearch/blob/images/sss.png)
英語学習を話せるようになりたい中上級者のみなさまへこのアプリでは、
好きな英単語がネイティブスピーカーが実際にどのように発音、使用するかを動画内で学習することができます！
1. 使い方は簡単　好きな英単語を検索、動画を選択するだけ！
2. 動画再生ページでは、好きな英単語が動画内で使われる時間で再生することができます
3. また、全字幕を表示する機能も搭載しているので、全文を通して学習したい方にもぴったりです


開発環境
- MacBook Air (13-inch, 2017)
- macOS Catalina (ver10.15.6)


URL
---
https://learn-from-natives.com/

操作画面GIF
---
![検索](https://media.giphy.com/media/KUhcVijR5pimULMb3i/giphy.gif)

![動画再生](https://media.giphy.com/media/tTK28fD65lDy8MOlWD/giphy.gif)

![検索に戻る](https://media.giphy.com/media/fJbF057SqxFMyEJn0y/giphy.gif)



使用技術
---

- JavaScript ES2020
- React.js 16.13.1
- Next.js 10.0.0
- styled-components  5.2.1
- material-ui　4.11.2
- axios　 0.21.1
- dotenv　8.2.0
- react-icons　4.1.0
- react-window　1.8.6
- react-youtube　7.13.0



JavaScript ES2020
React.js 16.13.1
Next.js 10.0.0
styled-components  5.2.1
material-ui　4.11.2
axios　 0.21.1
dotenv　8.2.0
react-icons　4.1.0
react-window　1.8.6
react-youtube　7.13.0


機能一覧
---
- ページ移動(Next.js)
- 検索語からyouTube動画IDの取得(TED API)
- 字幕データの取得(Geocoding API)
- 単語の辞書データの取得(Reverse Geocoding API)
- 一度にレンダリングされる字幕データ数のコントロール(react-window)
- 検索一覧に戻る(useRouter)



工夫点
---
- 字幕データが動画によっては膨大になり、リストにレンダリングする時間が長くなりました。これを抑えるため、react-windowを用いて、表示領域に応じてレンダリングするコンポーネントを制限しました。

- Reactは仮装DOMを使用するため、直接video Playerの再生時間を変更することができず苦労しました。これの解決策としてreactのuseRefを使用しました。
- google maps apiをポートフォリオのメイン機能として採用。ルート検索や現在地の取得などを

- 字幕データ内の特殊文字をJSXで通常通り表示するため


改善、気になっている点
---

#### アプリの機能が少ない。
- Firebaseを用いて検索語をお気に入りできる機能(実装予定)

#### フロント側（ブラウザ）で直接外部APIと通信を行っている
- 今後Express.jsなどを用いて、バックエンド側で外部APIを叩き、セキュリティの向上を図りたい

#### コードに無駄がある
- リファクタリングが不十分、コードに無駄がある。



作成の背景
---
自身も特別な英語学習の背景もなく、ゼロの状態から外国語学部入学、米国大学編入とする中で”英語が話せない”という非常に大きな壁にぶつかりました。
帰国してからも、多数の方々から””英語を学習しているのに話せるようにならない”という声を方々から多数聞きました。

英語を継続的に勉強しているにもかかわらず、あまり話せるようにならないと考える方々に対しアンケートやヒアリング、会話テストを行った結果、
話せない大きな原因として
単語を単語で勉強している。つまり、単語を実際の文章や会話の中で学習できていない。
これらの結果
1. ”単語の発音”がおかしいから伝わらない
2. ”単語のニュアンス、使われる場面”が間違っている
という問題があるということが浮き彫りとなりました。

この問題を解決するためには、**実際にネイティブスピーカーがどのように発音し、どんな文脈で英語を使っているかを知ることが最良の解決策**だという結論に至りこのアプリの開発に至りました。

このアプリが英語学習を頑張る方々の助けになればと思います。

