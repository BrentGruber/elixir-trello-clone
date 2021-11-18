defmodule Ello.Card do
  use Ecto.Schema
  import Ecto.Changeset

  schema "cards" do
    field :description, :string
    field :position, :integer
    field :title, :string
    field :list_id, :id

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:title, :description, :list_id, :position])
    |> validate_required([:title, :list_id])
  end
end
