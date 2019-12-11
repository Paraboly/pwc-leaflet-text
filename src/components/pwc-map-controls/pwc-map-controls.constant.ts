const PWC_MAP_CONTROLS_CONSTANT = {
  CONTROL_CONFIGS: {
    PwcTextControl: {
      controlName: "PwcTextControl",
      component: "pwc-text-control",
      params: {
        form: {
          title: "Etiket Düzenle",
          fontSize: 16,
          angle: 90,
          width: 120,
          padding: 5,
          fontColor: "#4b4b4b",
          bgColor: "#f2efe9"
        }
      },
      icon: "https://www.svgrepo.com/show/14960/text-box.svg",
      tooltipText: "Etiket ekle",
      type: "Point"
    },
    PWCRulerControl: {
      controlName: "RulerControl",
      template: "<pwc-custom-control-form/>",
      component: "pwc-ruler-control",
      icon: "https://www.svgrepo.com/show/193018/ruler.svg",
      tooltipText: "Uzunluk ölç",
      params: {
        form: {
          title: "Etiket Düzenle",
          fontSize: 16,
          angle: 90,
          width: 120,
          padding: 5,
          fontColor: "#4b4b4b",
          bgColor: "#f2efe9"
        }
      },
      type: "LineString"
    }
    // CutControl: {
    //   controlName: "CutControl",
    //   template: "<pwc-map-cut-control/>",
    //   icon: "https://image.flaticon.com/icons/svg/2162/2162462.svg",
    //   tooltipText: "Kırp"
    // }
  },
  DEFAULT_CUSTOM_CONTROLS: ["PwcTextControl", "PWCRulerControl"],
  DEFAULT_CONTROL_CONFIG: {
    position: "topleft"
  }
};

export default PWC_MAP_CONTROLS_CONSTANT;
