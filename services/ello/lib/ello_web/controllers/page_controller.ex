defmodule ElloWeb.PageController do
  use ElloWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
