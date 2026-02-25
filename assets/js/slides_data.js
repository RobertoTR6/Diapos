const SLIDES_DATA = [
  {
    id: "cover",
    type: "cover",
    notes: "Presentación del equipo y título del proyecto.",
    content: {
      image: "assets/img/up_edf.jpg",
      logo: "assets/img/up_logo.png",
      title: "SEGURIDAD HÍDRICA AL 2030: ESTRATEGIA A IMPLEMENTAR DESDE LA ANA",
      url: "egp.up.edu.pe",
      names: [
        "Castro Mozo Kiessling",
        "Guerrero Aguilar Marco Antonio",
        "Irureta Salvatierra Nidia Ninitza",
        "Terrones Rojas Roberto Carlos",
        "Tupac Yupanqui Ayala José Luis",
        "Villarreal Bautista Rosaura Yanet"
      ]
    }
  },
  {
    id: "s1",
    type: "crisis",
    notes: "Hablar sobre la brecha de 11 millones de personas y el ranking crítico del Perú en la región.",
    content: {
      title: "PERÚ: UNA CRISIS DE CALIDAD DEL AGUA",
      subtitle: "QUE AFECTA A MILLONES DE USUARIOS",
      metrics: [
        { label: "PERSONAS SIN ACCESO ADECUADO", value: "11", unit: "Millones", sub: "sin acceso adecuado a <strong>agua potable</strong>", color: "red" },
        { label: "NIVEL DE RIESGO HÍDRICO", value: "3.7", unit: "", sub: "indicador nacional de <strong>calidad y disponibilidad</strong>", color: "orange" }
      ],
      rankings: [
        { icon: "globe", title: "Entre los 32", sub: "países más críticos<br />del mundo", color: "orange" },
        { icon: "map-pin", title: "3er país", sub: "más crítico en<br />América Latina", color: "red" }
      ],
      evidence: { img: "assets/img/Imagen1.png", label: "" },
      chart: {
        title: "Estrés Hídrico en LA&C (Puntaje WRI)",
        items: [
          { country: "Chile", value: 4.47, level: "Extremadamente alto", color: "blue", highlight: false },
          { country: "México", value: 4.00, level: "Alto", color: "blue", highlight: false },
          { country: "Perú", value: 3.74, level: "Alto", color: "red", highlight: true }
        ]
      },
      impacts: {
        title: "Limitada seguridad hídrica que afecta a los <strong>USUARIOS DEL RECURSO HÍDRICO</strong>",
        items: [
          { icon: "droplet", title: "Consumo humano", desc: "Abastecimiento de agua potable y saneamiento", color: "blue" },
          { icon: "sprout", title: "Agricultura y producción", desc: "Riego de cultivos y actividades agroindustriales", color: "green" },
          { icon: "zap", title: "Energía y ecosistemas", desc: "Generación hidroeléctrica y biodiversidad", color: "yellow" }
        ]
      },
      footer: '"Si no protegemos la calidad del agua hoy, no habrá seguridad hídrica mañana."'
    }
  },
  {
    id: "s2",
    type: "diagnosis",
    notes: "Explicar el modelo causa-efecto. Los efectos arriba, las causas abajo y el horizonte 2030 como visión de éxito.",
    content: {
      title: "PERÚ | Situación actual y horizonte al 2030",
      label: "ANÁLISIS ESTRATÉGICO",
      effects: [
        { icon: "sprout", text: "Disminución de la producción agrícola y acuícola", color: "green" },
        { icon: "droplets", text: "Disminución de la atención y cobertura de agua potable", color: "blue" },
        { icon: "zap", text: "Disminución de la producción de energía eléctrica", color: "yellow" },
        { icon: "palmtree", text: "Afectación de las actividades turísticas y recreativas", color: "orange" }
      ],
      problem: { title: "LIMITADA SEGURIDAD HÍDRICA", sub: " QUE AFECTA A LA SOCIEDAD PERUANA" },
      causes: [
        { icon: "microscope", text: "Afectación de la calidad del agua en fuentes naturales y bienes asociados", color: "blue" },
        { icon: "bar-chart-3", text: "Deficiente manejo de la disponibilidad del agua para atender la demanda multisectorial", color: "cyan" },
        { icon: "cloud-lightning", text: "Alta vulnerabilidad ante cambios del régimen hidrológico en las unidades hidrográficas", color: "indigo" },
        { icon: "gavel", text: "Débil gobernanza hídrica", color: "slate" }
      ],
      horizon: {
        label: "ESCENARIO DESEADO AL 2030",
        items: [
          { icon: "trending-down", title: "Menor estrés hídrico", desc: "Tendencia descendente sostenida" },
          { icon: "database", title: "Eficiencia y Almacenamiento", desc: "Recuperación de fuentes naturales" },
          { icon: "shield-check", title: "Gobernanza Multinivel", desc: "Restauración de cuencas críticas" }
        ]
      },
      footer: '"La decisión estratégica hoy define si el Perú enfrenta un colapso hídrico o lidera un Renacimiento Azul."'
    }
  },
  {
    id: "s3",
    type: "strategy",
    notes: "Detallar las Acciones Estratégicas Institucionales (AEI) y sus metas al 2030.",
    content: {
      label: "PROPUESTA ESTRATÉGICA AL 2030",
      title: "Resultados directos del OEI 1 y sus Acciones Estratégicas",
      oei: {
        id: "OEI 1",
        text: "Elevar la cantidad y calidad del agua y sus bienes asociados en las cuencas hidrográficas",
        indicator: { label: "Indicador Clave", text: "% Cuencas evaluadas en cantidad y calidad:", value: "2.52%" }
      },
      aeis: [
        { id: "AEI 1.1", icon: "microscope", title: "Estudio de Evaluación de RRHH elaborados para actores de cuenca", sub: "% Estudios de Evaluación de RRHH elaborados", base: "33.33%", meta: "3.70%", color: "blue" },
        { id: "AEI 1.2", icon: "activity", title: "Estudios de Diagnóstico de Calidad de RRHH elaborados para actores de cuenca", sub: "% Estudios de Diagnóstico de Calidad de RRHH elaborados", base: "11.67%", meta: "6.67%", color: "cyan" },
        { id: "AEI 1.3", icon: "file-check", title: "Vertimientos formalizados otorgados para usuarios", sub: "N° Formalizaciones de Vertimientos otorgados", base: "51", meta: "10", color: "blue" },
        { id: "AEI 1.4", icon: "shield-check", title: "Fiscalizaciones de vertimientos de agua residual para actores de cuenca", sub: "N° Fiscalizaciones de vertimientos de agua residual", base: "404", meta: "400", color: "cyan" }
      ]
    }
  },
  {
    id: "s4",
    type: "value",
    notes: "Resaltar el valor público: salud, economía y protección del entorno.",
    content: {
      label: "VALOR CIUDADANO",
      title: "Beneficios para la ciudadanía al 2030",
      intro: "Resultados directos del OEI 1 y sus Acciones Estratégicas",
      benefits: [
        { icon: "shield-check", title: "Más seguridad hídrica", color: "blue", points: ["Más cuencas evaluadas integralmente", "Decisiones basadas en evidencia técnica", "Prevención efectiva de crisis de escasez"] },
        { icon: "home", title: "Agua segura para familias", color: "cyan", points: ["Diagnósticos de calidad focalizados", "Intervenciones en zonas críticas", "Menor exposición a agua contaminada"] },
        { icon: "waves", title: "Menor contaminación de ríos", color: "indigo", points: ["Vertimientos formalizados y controlados", "Usuarios productivos eco-eficientes", "Control estricto de descargas residuales"] },
        { icon: "trees", title: "Protección de ecosistemas", color: "emerald", points: ["400 fiscalizaciones anuales proactivas", "Cumplimiento del estándar ambiental", "Conservación de fuentes de agua naturales"] }
      ],
      summary: {
        label: "Impacto en el Resultado País al 2030",
        items: [
          { icon: "heart", cat: "Bienestar", text: "Salud pública", color: "rose" },
          { icon: "trending-up", cat: "Economía", text: "Sostenibilidad", color: "emerald" },
          { icon: "shield-check", cat: "Entorno", text: "Protección ambiental", color: "cyan" },
          { icon: "bar-chart-3", cat: "Desarrollo", text: "Metas nacionales", color: "orange" },
          { icon: "users", cat: "Sociedad", text: "Confianza ciudadana", color: "indigo" },
          { icon: "target", cat: "Meta Final", text: "Seguridad Total", color: "blue" }
        ]
      }
    }
  },
  {
    id: "s5",
    type: "implementation",
    notes: "Ruta de aprobación y alineamiento institucional inmediata.",
    content: {
      label: "IMPLEMENTACIÓN",
      title: "Ruta para la implementación de la estrategia",
      sub: "Plan Estratégico Institucional – Autoridad Nacional del Agua",
      phases: [
        {
          id: "activacion",
          title: "FASE DE ACTIVACIÓN",
          sub: "Ruta Inmediata",
          icon: "rocket",
          color: "blue",
          steps: [
            "Aprobación del PEI 2025–2030 mediante Resolución Ministerial",
            "Publicación oficial en el Diario Oficial El Peruano",
            "Difusión institucional y alineamiento interno (PEI–POI–Presupuesto)"
          ]
        },
        {
          id: "consolidacion",
          title: "CONSOLIDACIÓN",
          sub: "Próximos Pasos Clave",
          icon: "compass",
          color: "indigo",
          highlight: { title: "Publicación oficial", sub: "Entrada en vigencia", icon: "flag" },
          alignment: {
            title: "Alineamiento institucional",
            items: [
              { label: "Adecuación del POI", color: "blue" },
              { label: "Ajustes presupuestales", color: "indigo" },
              { label: "Seguimiento de indicadores", color: "cyan" }
            ]
          }
        }
      ],
      footer_quote: '"El PEI 2025–2030 habilita la gestión estratégica institucional."',
      final_desc: "Su aprobación permite iniciar la ejecución articulada de metas, consolidar la gobernanza hídrica y avanzar con predictibilidad hacia la seguridad hídrica y el futuro deseado."
    }
  },
  {
    id: "s6",
    type: "references",
    notes: "Fuentes oficiales y documentos de referencia para consulta.",
    content: {
      label: "REFERENCIAS",
      title: "Fuentes de información y bibliografía",
      sources: [
        { text: "World Bank. (2023). P173636: Documento del proyecto.", url: "https://documents1.worldbank.org/curated/en/099062023100531967/pdf/P17363602652300490a20b067e3b55cf68d.pdf" },
        { text: "Organización para la Cooperación y el Desarrollo Económicos. (2021). Gobernanza del agua en el Perú.", url: "https://www.oecd.org/content/dam/oecd/es/publications/reports/2021/03/water-governance-in-peru_0980e96a/f826f55f-es.pdf" },
        { text: "Defensoría del Pueblo. (2024). Informe defensorial N.º 227.", url: "https://www.defensoria.gob.pe/wp-content/uploads/2024/10/Informe-defensorial-n.%C2%B0-227-.pdf" },
        { text: "El Comercio. (s.f.). Capacidad de almacenamiento de agua en el Perú es 10 veces menor que en la región.", url: "https://elcomercio.pe/economia/opinion/agua-capacidad-de-almacenamiento-de-agua-en-el-peru-es-10-veces-menor-que-en-la-region-sequia-noticia/" },
        { text: "Instituto Nacional de Estadística e Informática. (s.f.). Publicación digital, Capítulo 02.", url: "https://www.inei.gob.pe/media/MenuRecursivo/publicaciones_digitales/Est/Lib1863/cap02.pdf" },
        { text: "Energiminas. (2023, 4 de septiembre). Sin agua: más de 3 millones de peruanos aún no cuentan con el recurso hídrico.", url: "https://energiminas.com/2023/09/04/sin-agua-mas-de-3-millones-de-peruanos-aun-no-cuentan-con-el-recurso-hidrico/" }
      ]
    }
  }
];
