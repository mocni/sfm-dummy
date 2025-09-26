export type DsPromjene = {
  /**
   * @type number, int32
   */
  id: number;
  /**
   * @type string, date-time
   */
  vrijeme: string;
  /**
   * @type number, int64
   */
  scn: number;
}[];

export type DsEmailAdreseSvi = {
  /**
   * @type number, int32
   */
  email_adresa_rbr: number;
  /**
   * @type array | undefined
   */
  email_adresa_povijest?: {
    /**
     * @type number, int32
     */
    status: number;
    /**
     * @type number, int32
     */
    prbu_od: number;
    /**
     * @type number | undefined, int32
     */
    prbu_do?: number;
    /**
     * @type number, int64
     */
    upis_id_od: number;
    /**
     * @type number | undefined, int64
     */
    upis_id_do?: number;
    /**
     * @type string
     */
    adresa: string;
  }[];
}[];

export type DsSjedisteSvi = {
  /**
   * @type array | undefined
   */
  sjediste_povijest?: {
    /**
     * @type number, int32
     */
    status: number;
    /**
     * @type number, int32
     */
    prbu_od: number;
    /**
     * @type number | undefined, int32
     */
    prbu_do?: number;
    /**
     * @type number, int64
     */
    upis_id_od: number;
    /**
     * @type number | undefined, int64
     */
    upis_id_do?: number;
    /**
     * @type number | undefined, int64
     */
    drzava_id?: number;
    /**
     * @type number | undefined, int32
     */
    sifra_zupanije?: number;
    /**
     * @type string | undefined
     */
    naziv_zupanije?: string;
    /**
     * @type number | undefined, int32
     */
    sifra_opcine?: number;
    /**
     * @type string | undefined
     */
    naziv_opcine?: string;
    /**
     * @type number | undefined, int64
     */
    sifra_naselja?: number;
    /**
     * @type string | undefined
     */
    naziv_naselja?: string;
    /**
     * @type string | undefined
     */
    naselje_van_sifrarnika?: string;
    /**
     * @type number | undefined, int64
     */
    sifra_ulice?: number;
    /**
     * @type string | undefined
     */
    ulica?: string;
    /**
     * @type number | undefined, int32
     */
    kucni_broj?: number;
    /**
     * @type string | undefined
     */
    kucni_podbroj?: string;
    /**
     * @type number | undefined, int32
     */
    postanski_broj?: number;
  }[];
};

export type DsSkracenaTvrtkaSvi = {
  /**
   * @type array | undefined
   */
  skracena_tvrtka_povijest?: {
    /**
     * @type number, int32
     */
    status: number;
    /**
     * @type number, int32
     */
    prbu_od: number;
    /**
     * @type number | undefined, int32
     */
    prbu_do?: number;
    /**
     * @type number, int64
     */
    upis_id_od: number;
    /**
     * @type number | undefined, int64
     */
    upis_id_do?: number;
    /**
     * @type string
     */
    ime: string;
  }[];
};

export type DsTvrtkaSvi = {
  /**
   * @type array | undefined
   */
  tvrtka_povijest?: {
    /**
     * @type number, int32
     */
    status: number;
    /**
     * @type number, int32
     */
    prbu_od: number;
    /**
     * @type number | undefined, int32
     */
    prbu_do?: number;
    /**
     * @type number, int64
     */
    upis_id_od: number;
    /**
     * @type number | undefined, int64
     */
    upis_id_do?: number;
    /**
     * @type string
     */
    ime: string;
    /**
     * @type string | undefined
     */
    naznaka_imena?: string;
  }[];
};

export type DetaljiSubjektaSvi = {
  /**
   * @type number, int32
   */
  mbs: number;
  /**
   * @type number, int32
   */
  status: number;
  /**
   * @type number, int64
   */
  sud_id_nadlezan: number;
  /**
   * @type number, int64
   */
  sud_id_sluzba: number;
  /**
   * @type number | undefined, int64
   */
  oib?: number;
  /**
   * @type number | undefined, int32
   */
  mb?: number;
  /**
   * @type string
   */
  potpuni_mbs: string;
  /**
   * @type string | undefined
   */
  potpuni_oib?: string;
  /**
   * @type number, int32
   */
  ino_podruznica: number;
  /**
   * @type number, int32
   */
  stecajna_masa: number;
  /**
   * @type number, int32
   */
  likvidacijska_masa: number;
  /**
   * @type number | undefined, int32
   */
  mbs_brisanog_subjekta?: number;
  /**
   * @type number | undefined, int32
   */
  glavna_djelatnost?: number;
  /**
   * @type number | undefined, int32
   */
  glavna_podruznica_rbr?: number;
  /**
   * @type string | undefined, date-time
   */
  datum_osnivanja?: string;
  /**
   * @type string | undefined, date-time
   */
  datum_brisanja?: string;
  /**
   * @type number | undefined, int64
   */
  sud_id_brisanja?: number;
  /**
   * @type string | undefined
   */
  tvrtka_kod_brisanja?: string;
  /**
   * @type string | undefined
   */
  poslovni_broj_brisanja?: string;
  /**
   * @type string | undefined, date-time
   */
  vrijeme_zadnje_izmjene?: string;
  /**
   * @type number | undefined, int64
   */
  scn_zadnje_izmjene?: number;
  tvrtka?: DsTvrtkaSvi;
  skracena_tvrtka?: DsSkracenaTvrtkaSvi;
  sjediste?: DsSjedisteSvi;
  email_adrese?: DsEmailAdreseSvi;
  promjene?: DsPromjene;
};
