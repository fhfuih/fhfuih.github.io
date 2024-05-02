---
title: "vCard"
date: 2024-05-02T10:45:07+08:00
lang: en
draft: true
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
      href='https://yellowzeyu.com'
      class="icon-button"
      rel="noreferrer noopener"
      title="Homepage"
    >
      {{ partial "helper/icon" "building-pavilion" }}
      <div>Homepage</div>
    </a>
  </li>
</ul>
{{< /card-links.inline >}}

</address>
