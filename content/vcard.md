---
title: "vCard"
date: 2024-05-02T10:44:55+08:00
lang: zh-cn
layout: plain
type: card
---

<address>

<div class="info">
  <div class="info-text">
    <p class="name">黄泽宇（HUANG, Zeyu）</p>
    <p class="position">香港科技大学计算机系</p>
    <p class="position">人机交互方向博士候选人</p>
    {{< card-email.inline >}}
    <p class="email"><b>zhuangbi</b>{{ partial "helper/icon" "at" }}connect.ust.hk</p>
    {{< /card-email.inline >}}
  </div>
  
  {{< card-image.inline >}}
    {{ $avatar := resources.Get "avatar.jpg" }}
    <img src="{{ $avatar.RelPermalink }}" id="avatar" class="avatar" loading="lazy" alt="A very handsome face of mine">
  {{< /card-image.inline >}}
</div>

{{< card-links.inline >}}
<ul class="links">
  {{ range .Site.Menus.social }}
  {{ if gt .Weight 10 }}{{ break }}{{ end }}
  <li>
    <a
      href='{{ .URL }}'
      class="icon-button"
      {{ if eq (default true .Params.newTab) true }}target="_blank" rel="noreferrer noopener"{{ end }}
      title="{{ .Name }}"
    >
      {{ $icon := default "link" .Params.Icon }}
      {{ with $icon }}
          {{ partial "helper/icon" . }}
      {{ end }}
      <div>{{ .Name }}</div>
    </a>
  </li>
  {{ end }}
  <li>
    <a
      href='https://yellowzeyu.com'
      class="icon-button"
      rel="noreferrer noopener"
      title="个人主页"
    >
      {{ partial "helper/icon" "building-pavilion" }}
      <div>个人主页</div>
    </a>
  </li>
  <li>
    <a
      href='https://hkustconnect-my.sharepoint.com/:b:/g/personal/zhuangbi_connect_ust_hk/EUkzNK6hR79Gt7vpvmct484BZFsX3HfRbMC7l_GFRKi2oA?e=HftN3l'
      class="icon-button"
      rel="noreferrer noopener"
      title="简历"
    >
      {{ partial "helper/icon" "file-cv" }}
      <div>简历</div>
    </a>
  </li>
  <li>
    <a
      href='/en/vcard/'
      class="icon-button"
      rel="noreferrer noopener"
      title="English"
    >
      {{ partial "helper/icon" "language" }}
      <div>English</div>
    </a>
  </li>
</ul>
{{< /card-links.inline >}}

</address>
