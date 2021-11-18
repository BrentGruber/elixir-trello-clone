defmodule Ello.Repo.Migrations.FirstMigration do
  use Ecto.Migration

  def change do
    create table(:boards) do
      add :title, :string
      add :img_url, :string

      timestamps()
    end

    create table(:lists) do
      add :title, :string
      add :position, :integer, default: 0
      add :board_id, references(:boards, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:lists, [:board_id])

    create table(:cards) do
      add :title, :string, null: false
      add :description, :text
      add :list_id, references(:lists, on_delete: :delete_all), null: false
      add :position, :integer, default: 0

      timestamps()
    end

    create index(:cards, [:list_id])
  end
end
