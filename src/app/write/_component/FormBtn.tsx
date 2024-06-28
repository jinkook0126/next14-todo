"use client";

import Link from "next/link";
import styles from "./formBtn.module.css";
import cx from "classnames";
import useTodoStore from "@/store/useTodoStore";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_component/ToastProvider";

const FormBtn = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const { register } = useTodoStore();
  const { showToast } = useToast();

  const onRegister: FormEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    register(content);
    showToast("등록되었습니다.");
    router.back();
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onRegister}>
        <input
          value={content}
          onChange={onChange}
          className={styles.input}
          type="text"
          placeholder="오늘 하루 긍정적 생각하기"
        />
        <div className={styles.buttonContainer}>
          <Link href="/">
            <button className={cx(styles.btn, styles.cancel)}>취소</button>
          </Link>
          <button type="submit" className={cx(styles.btn, styles.register)}>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormBtn;

/**
 *
 * 이진국은 보아라.
 * input의 값을 가져와야 하기 때문에
 * page의 input도 client 컴포넌트가 되어야 한다.
 * input도 가져온 김에 input과 button을 form으로 묶어라.
 * 그리고 button의 onclick은 제거하고 form의 submit을 이용해라.
 * submit을 받으면 새로고침이나 그런게 될 수 있으니까 event에서 preventDefault() 같은 것도 해라
 * 등록 후 뒤로 갔으면 좋겠다.
 *
 */
