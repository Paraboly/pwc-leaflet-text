class PWCCustomControlForm {
  name: string;
  shapeProps?: {
    width?: string;
    height?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    transform?: string;
    fontSize?: string;
  };
  pwcProps: {
    type: string;
    created?: string;
    updated?: string;
  };

  constructor(form: any) {
    this.forClient(form);
  }

  private forClient(form): void {
    Object.assign(this, form);

    this.shapeProps = this.shapeProps || {};
    this.pwcProps = this.pwcProps || {
      type: "PWCEditableText",
      created: new Date().toISOString()
    };
  }

  public forServer(): PWCCustomControlForm {
    const forServer = Object.assign({}, this);
    forServer.pwcProps.updated = new Date().toISOString();

    return forServer;
  }
}

export default PWCCustomControlForm;
