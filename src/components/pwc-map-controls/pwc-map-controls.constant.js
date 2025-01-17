const PWC_MAP_CONTROLS_CONSTANT = {
  CONTROL_CONFIGS: {
    TextControl: {
      controlName: "TextControl",
      tag: "pwc-custom-control-form",
      template: "<pwc-custom-control-form/>",
      params: {
        form: {
          title: "Etiket Düzenle"
        }
      },
      icon: "https://www.svgrepo.com/show/14960/text-box.svg",
      tooltipText: "Etiket ekle"
    },
    RulerControl: {
      controlName: "RulerControl",
      tag: "pwc-custom-control-form",
      template: "<pwc-custom-control-form/>",
      icon: "https://www.svgrepo.com/show/193018/ruler.svg",
      tooltipText: "Uzunluk ölç"
    },
    CutControl: {
      controlName: "CutControl",
      template: "<pwc-map-cut-control/>",
      icon: "https://image.flaticon.com/icons/svg/2162/2162462.svg",
      tooltipText: "Kırp"
    }
  },
  DEFAULT_CUSTOM_CONTROLS: ["TextControl", "RulerControl", "CutControl"],
  DEFAULT_CONTROL_CONFIG: {
    position: "topleft"
  }
};

export default PWC_MAP_CONTROLS_CONSTANT;
