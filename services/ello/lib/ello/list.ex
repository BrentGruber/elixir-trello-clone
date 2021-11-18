defmodule Ello.List do
  use Ecto.Schema
  import Ecto.Changeset

  schema "lists" do
    field :position, :integer
    field :title, :string
    field :board_id, :id

    has_many :cards, Ello.Card

    timestamps()
  end

  @doc false
  def changeset(list, attrs) do
    list
    |> cast(attrs, [:position, :title])
    |> validate_required([:position, :title])
  end
end
