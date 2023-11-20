import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const initialValues = { username: "", mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    // ...はスプレッド演算子。既存のオブジェクトを変更せずに新しいプロパティを追加できる。
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    // submitしたときに、ページの更新を妨げてデータが消えることを防ぐ
    e.preventDefault();
    // ログイン情報を送信する
    //バリデーションチェックをする
    setFormErrors(validate(formValues));
    // handleSubmitを押した時にsetIsSubmitはtrueになる。
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    // regex=正規表現の意味
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    // 下記コードの「!」は、からの文字列や`null`等のfalsyな値であるかどうかを検証している
    if (!values.username) {
      errors.username = "ユーザー名を入力してください";
    }
    if (!values.mailAddress) {
      errors.mailAddress = "メールアドレスを入力してください";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "正しいメールアドレスを入力してください";
    }
    if (!values.password) {
      errors.password = "パスワードを入力してください";
    } else if (values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    } else if (values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }
    return errors;
  };

  return (
    <div className="formContainer">
      {/* submit※ボタンをユーザーが押したときに走る処理 */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>ログインフォーム</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>ユーザー名</label>
            <input
              type="text"
              placeholder="ユーザー名"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <p className="errorMsg">{formErrors.username}</p>
          <div className="formField">
            <label>メールアドレス</label>
            <input
              type="text"
              placeholder="メールアドレス"
              name="mailAddress"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.mailAddress}</p>
          <div className="formField">
            <label>パスワード</label>
            <input
              type="text"
              placeholder="パスワード"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p className="errorMsg">{formErrors.password}</p>
          <button className="submitButton">ログイン</button>
          {/* formErrorsオブジェクト内のエラーメッセージが
          どのプロパティ(キー)に関連しているかを動的に取得し、
          それに基づいて表示している。Objact.keys()はメソッド。
          以下コードでは、エラーの文字数が0個ならログイン成功と表示する。 */}
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className="msgOk">ログインに成功しました</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
