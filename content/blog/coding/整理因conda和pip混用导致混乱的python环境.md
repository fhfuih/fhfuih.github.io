---
title: "整理因conda和pip混用导致混乱的python环境"
date: 2022-04-04T19:50:4408:00
draft: true
lang: zh-cn
---

[Using pip in a conda environment](https://www.anaconda.com/blog/using-pip-in-a-conda-environment)

`conda update --all`解决conda inconsistencies。可能需要多跑几次、同时密切观察它提示的inconsistencies和应对操作是什么，直到这条命令就返回一句`# All requested packages already installed.`。如果发现重跑到后面一直在兜圈圈，建议重装conda吧。

`conda env export`

在我`pip uninstall tensorflow tensorflow-xxx tensorboard tensorboard-xxx keras`之后：

```yaml
# ...
dependencies:
	# ...
	- pip:
		- absl-py==1.0.0
	    - astunparse==1.6.3
	    - cachetools==5.0.0
	    - dill==0.3.4
	    - flatbuffers==2.0
	    - gast==0.5.3
	    - google-auth==2.6.0
	    - google-auth-oauthlib==0.4.6
	    - google-pasta==0.2.0
	    - googleapis-common-protos==1.55.0
	    - libclang==13.0.0
	    - markdown==3.3.6
	    - mysql-connector-python==8.0.28
	    - oauthlib==3.2.0
	    - opt-einsum==3.3.0
	    - promise==2.3
	    - protobuf==3.19.4
	    - pyasn1==0.4.8
	    - pyasn1-modules==0.2.8
	    - pygraphviz==1.9
	    - pyyaml==6.0
	    - requests-oauthlib==1.3.1
	    - rsa==4.8
	    - six==1.15.0
	    - spektral==0.0.13
	    - termcolor==1.1.0
	    - tf-estimator-nightly==2.8.0.dev2021122109
	    - werkzeug==2.0.3
	    - wrapt==1.14.0
	    - zhconv==1.4.3
```

这个YAML有点太长了，我们可以下载一个[yq](https://kislyuk.github.io/yq/)来帮忙过滤信息

`conda install pipdeptree`
`pipdeptree -r -p <包名>`（reverse, package）

```
➜ pipdeptree -r -p pyasn1
pyasn1==0.4.8
  - pyasn1-modules==0.2.8 [requires: pyasn1>=0.4.6,<0.5.0]
    - google-auth==2.6.0 [requires: pyasn1-modules>=0.2.1]
      - google-auth-oauthlib==0.4.6 [requires: google-auth>=1.0.0]
  - rsa==4.8 [requires: pyasn1>=0.1.3]
    - google-auth==2.6.0 [requires: rsa>=3.1.4,<5]
      - google-auth-oauthlib==0.4.6 [requires: google-auth>=1.0.0]
➜ pipdeptree -r -p google-auth-oauthlib
google-auth-oauthlib==0.4.6
```

依此我们可以`conda env export | yq '.dependencies.[] | select(has("pip")) | .pip' | xargs -L1 | sed 's/^- //' | sed 's/==.*$//' | xargs -L1 pipdeptree -rp`