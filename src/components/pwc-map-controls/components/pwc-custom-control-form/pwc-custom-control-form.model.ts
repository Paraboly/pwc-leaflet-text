class PWCCustomControlForm {
  title: string;
  type = "label";
  created?: string | Date;
  updated?: string | Date;
  shapeProps?: {} = {};
  geometry: L.GeoJSON;

  constructor(form: any) {
    this.title = form.title;
    this.created = this.created || new Date().toISOString();
    this.updated = form.updated ? new Date(form.updated) : form.updated;

    Object.keys(form).map(key => {
      if (key !== "title") this.shapeProps[key] = form[key];
    });
  }

  public forServer(): PWCCustomControlForm {
    const forServer = Object.assign({}, this);
    forServer.updated = new Date().toISOString();
    delete forServer.title;
    return forServer;
  }
}

export default PWCCustomControlForm;
