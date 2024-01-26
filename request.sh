

#!/bin/bash
  echo "domainはどれですか？（xf64e / rvmbe）"
  select domain in "xf64e" "rvmbe"; do
      if [ -n "$domain" ]; then
        echo "あなたが選んだ項目は $domain です。"
        export DOMAIN=$domain
        break
      else
        echo "無効な選択です。もう一度選んでください。"
      fi
  done

  echo "どちらの製品ですか（Garoon / Kintone）"
  select cybozu in "Garoon" "Kintone"; do
      if [ -n "$cybozu" ]; then
        echo "あなたが選んだ項目は $cybozu です。"
        export CYBOZU=$cybozu
        break
      else
        echo "無効な選択です。もう一度選んでください。"
      fi
  done

  echo "どちらのリクエストですか？（Get / Delete）"
  select request in "Get" "Delete"; do
      if [ -n "$request" ]; then
        echo "あなたが選んだ項目は $request です。"
        export REQUEST=$request
        break
      else
        echo "無効な選択です。もう一度選んでください。"
      fi
  done

  echo "複数ですか？（one / multiple）"
  select multiple in "yes" "no"; do
    if [ "$multiple" = "no" ]; then
      echo "一つの場合、idは？"
      read start
      export START=$start
      break
    elif [ "$multiple" = "yes" ]; then
      echo "複数の場合、idは？"
      echo "どこから"
      read start
      echo "どこまで"
      read end
      export END=$end
      break
    fi
  done

  echo "$domain の $cybozu へ $request リクエストを行います。"
  echo "よろしいでしょうか？"
  select excute in "はい" "いいえ"; do
    if [ "$excute" = "はい" ]; then
      echo "リクエストを行います。"
      node index.js
      break
    elif [ "$excute" = "いいえ" ]; then
      echo "リクエスト中止"
      break
    fi
  done
