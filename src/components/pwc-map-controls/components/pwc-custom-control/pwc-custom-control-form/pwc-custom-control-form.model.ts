class PWCCustomControlForm {
  title: string;
  created?: string | Date;
  updated?: string | Date;
  shapeProps?: {
    color?: string;
    width?: string;
  };
  geometry: L.GeoJSON;

  constructor(form: PWCCustomControlForm) {
    this.title = form.title;
    this.created = this.created || new Date().toISOString();
    this.updated = form.updated ? new Date(form.updated) : form.updated;
  }

  public forServer(): PWCCustomControlForm {
    const forServer = Object.assign({}, this);
    forServer.updated = new Date().toISOString();
    return forServer;
  }
}

export default PWCCustomControlForm;
