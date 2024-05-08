---
title: "vCard"
date: 2024-05-02T10:45:07+08:00
lang: en
layout: plain
type: card
---

<address>

<div class="info">
  <div class="info-text">
    <p class="name">HUANG, Zeyu (黄泽宇)</p>
    <p class="position">Ph.D. Candidate in Computer Science</p>
    <p class="position">
      Human-Computer Interaction Initiative<br/>
      The Hong Kong University of Science and Technology
    </p>
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
      href='https://yellowzeyu.com/en/'
      class="icon-button"
      rel="noreferrer noopener"
      title="Homepage"
    >
      {{ partial "helper/icon" "building-pavilion" }}
      <div>Homepage</div>
    </a>
  </li>
  <li>
    <a
      href='https://hkustconnect-my.sharepoint.com/:b:/g/personal/zhuangbi_connect_ust_hk/EUkzNK6hR79Gt7vpvmct484BZFsX3HfRbMC7l_GFRKi2oA?e=HftN3l'
      class="icon-button"
      rel="noreferrer noopener"
      title="CV"
    >
      {{ partial "helper/icon" "file-cv" }}
      <div>CV</div>
    </a>
  </li>
    <li>
    <a
      href='/vcard/'
      class="icon-button"
      rel="noreferrer noopener"
      title="简体中文"
    >
      {{ partial "helper/icon" "language" }}
      <div>简体中文</div>
    </a>
  </li>
</ul>
{{< /card-links.inline >}}

</address>
