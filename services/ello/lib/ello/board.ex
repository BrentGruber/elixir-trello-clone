defmodule Ello.Board do
  use Ecto.Schema
  import Ecto.Changeset

  schema "boards" do
    field :img_url, :string
    field :title, :string

    has_many :lists, Ello.List

    timestamps()
  end

  @doc false
  def changeset(board, attrs) do
    board
    |> cast(attrs, [:img_url, :title])
    |> validate_required([:img_url, :title])
  end
end
