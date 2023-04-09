{{- define "chart.labels" -}}
chart: "{{ .Chart.Name }}-{{ .Chart.Version }}"
{{- end -}}

{{- define "backend.name" -}}
{{- printf "%s-%s" .Chart.Name "backend" -}}
{{- end -}}

{{- define "backend.port" -}}
{{- 8080 -}}
{{- end -}}

{{- define "storefront.name" -}}
{{- printf "%s-%s" .Chart.Name "storefront" -}}
{{- end -}} 

{{- define "storefront.port" -}}
{{- 80 -}}
{{- end -}}

{{- define "dashboard.name" -}}
{{- printf "%s-%s" .Chart.Name "dashboard" -}}
{{- end -}}

{{- define "dashboard.port" -}}
{{- 80 -}}
{{- end -}}

{{- define "postgres.name" -}}
{{- printf "%s-%s" .Chart.Name "postgres" -}}
{{- end -}}

{{- define "postgres.port" -}}
{{- 5432 -}}
{{- end -}}

{{- define "postgres.database" -}}
{{- printf "webshop" -}}
{{- end -}}
