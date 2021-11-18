defmodule Ello.Repo do
  use Ecto.Repo,
    otp_app: :ello,
    adapter: Ecto.Adapters.Postgres
end
