# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 25/11/2026, 16:34:29. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13904 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- pdf-lib para gerar contratos em A4 profissional -->
24: <!-- Gera o QR code do Pix a partir do copia e cola -->
26: <!-- Supabase (banco de dados online) -->
142: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
147: <!-- Header Principal -->
161: <!-- Controles do Header -->
163: <!-- Botão Status Online/Offline (Motorista) -->
171: <!-- Ativar Notificações -->
176: <!-- Temas -->
181: <!-- Logout Button -->
190: <!-- Conteúdo Principal -->
193: <!-- TELA DE LOGIN -->
194: #secLogin
227: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
228: #secDemoEscolha
243: <!-- TELA PÚBLICA DE ASSINATURA OFICIAL VIA GOV.BR (?assinar=token) -->
244: #secGovBrInvite
258: <!-- PAINEL DO MOTORISTA -->
259: #secDriverPanel
261: <!-- Card do Veículo Vinculado -->
275: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
286: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
291: <!-- Aviso: nova versão do app Android -->
294: <!-- Aviso vermelho: notificações desligadas -->
297: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
301: <!-- Aviso de Pix / pagamento pendente -->
304: <!-- Navegação de Abas -->
322: <!-- Conteúdo das Abas Motorista -->
325: <!-- Aba CRLV-e -->
326: #tabDrvCrlv
331: <!-- Renderizado dinamicamente -->
335: <!-- Aba Contrato -->
336: #tabDrvContract
346: <!-- Renderizado dinamicamente -->
350: <!-- Aba Vistoria -->
351: #tabDrvInspection
358: <!-- Aba Pagamento -->
359: #tabDrvPayment
372: <!-- Caução e multas do motorista -->
374: <!-- Valor e descrição da cobrança -->
384: <!-- Seção Pix -->
398: <!-- QR Code Renderizado aqui -->
431: <!-- Seção Upload de Comprovante -->
448: <!-- Lista de comprovantes -->
453: <!-- Recibos quando o contrato está encerrado -->
460: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
461: #secMasterPanel
501: <!-- Aviso: falta criar a tabela dos termos no banco -->
504: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
506: <!-- Lista de Veículos -->
522: <!-- Renderizado via JS -->
529: <!-- Form de Adicionar Veículo -->
576: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
676: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
682: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
687: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
692: <!-- Fichas Arquivadas (após marcar caução pago) -->
701: <!-- Form de Adicionar Motorista -->
796: <!-- Barra de baixo do dono (só no design novo) -->
807: <!-- MODAL PRIMEIRO LOGIN -->
808: #modalFirstLogin
842: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
843: #modalNotif
856: <!-- MODAL VISTORIA (MASTER) -->
857: #modalInspection
870: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
871: #modalSettings
1036: <!-- MODAL TEMAS -->
1037: #modalThemes
1048: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1049: #modalCreds
1064: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1079: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1080: #modalDriverFile
1122: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1126: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1155: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1170: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1212: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1213: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1214: #modalRecibo
1233: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1234: #modalPixArea
1250: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1251: #modalIA
1333: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1334: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1335: #modalEditVeh
1372: #modalSenha
1395: #modalAvisoDev
1421: #modalMeusRecibos
1439: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1440: #modalEmail
1460: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1461: #modalReport
1476: #modalFinCardDetail
1489: #modalFinance
1522: <!-- FILTROS -->
1572: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1592: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1593: #modalExpenses
1628: <!-- MODAL NOVO PIX -->
1629: #modalNewPix
1681: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1739: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1740: #modalCorrigirRecibo
1754: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1755: #modalContractWizard
1771: <!-- Seleção Motorista & Veículo -->
1783: <!-- Locador -->
1804: <!-- Locatário -->
1825: <!-- Veículo -->
1848: <!-- Configuração Comercial -->
1924: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1992: <!-- Cláusulas editáveis -->
2004: <!-- Prévia -->
2018: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
2019: #modalContractDetail
2032: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
2033: #modalInspectionTerm
2094: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2117: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2157: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2158: #modalInspectionTermDetail
2171: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2172: #modalInspDamageConfirm
2187: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2188: #modalDocViewer
2196: #modalDocBody
2197: <!-- Conteúdo pré-visualizado -->
2203: #modalTerms
2217: <!-- NOTIFICAÇÕES TOAST -->
2234: lsGet()
2235: lsSet()
2236: lsDel()
2259: demoLoginRole()
2263: demoId()
2264: demoSave()
2265: demoSaved()
2267: *datas no horário de Brasília*
2268: demoLocal()
2269: demoParts()
2270: demoDay()
2271: demoNextDue()
2276: *dados fictícios (4 meses)*
2277: demoBuild()
2510: *documentos fictícios (imagem gerada na hora)*
2511: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2512: demoDocBlob()
2590: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2591: demoQuery()
2614: out()
2620: run()
2661: demoOnUpdate()
2671: demoOnInsert()
2804: demoClient()
3007: demoStart()
3015: demoStop()
3021: abrirDemo()
3028: trocarDemo()
3033: demoBanner()
3048: toEmail()
3052: showLogin()
3056: esc()
3061: toBRTInput()
3074: parseBRTInputToIso()
3083: dataHoraBR()
3097: uiDialogo()
3145: uiConfirm()
3154: uiPrompt()
3160: friendlyError()
3170: unwrapInvokeResult()
3190: devicePrefs()
3193: saveDevicePrefs()
3196: docRef()
3197: viewDocIdx()
3199: setBusy()
3242: **TEMAS**
3251: currentTheme()
3256: applyTheme()
3257: openThemes()
3267: pickTheme()
3273: toggleDarkMode()
3275: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3277: loadDesignCfg()
3284: applyDesign()
3301: markMasterNav()
3308: fillDesignCfg()
3313: saveDesign()
3327: showToast()
3336: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3337: senhaErro()
3338: abrirSenha()
3347: salvarIaCodigo()
3357: fecharSenha()
3358: salvarSenha()
3379: loginUserInput()
3384: loginErro()
3388: verSenha()
3393: handleLogin()
3442: logout()
3461: saveFirstLoginPreferences()
3484: carregarDados()
3516: aplicarDados()
3557: loadAndRender()
3584: autoRefresh()
3623: markUpdated()
3628: reload()
3633: renderApp()
3681: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3684: masterBack()
3686: viewAsDriver()
3708: exitViewAs()
3727: viewOnly()
3728: renderViewAsBanner()
3738: showSection()
3743: withBtn()
3751: toggleDriverStatus()
3760: isOnline()
3762: updateStatusToggleUI()
3775: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3784: checkApkUpdate()
3799: updateInstallApkButton()
3819: renderDriverPanel()
4078: switchDriverTab()
4093: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
4096: parsePixKey()
4100: normalizePixKey()
4108: pixKeyLooksOk()
4116: togglePixKeyFields()
4122: updatePixKeyPlaceholder()
4128: copyPixKey()
4135: copyPixCode()
4147: receiptBadge()
4157: receiptMasterBox()
4184: receiptAction()
4191: confirmReceipt()
4220: rejectReceipt()
4232: recheckReceipt()
4241: uploadReceipt()
4264: switchMasterTab()
4283: maskPhone()
4292: waLink()
4297: allVeh()
4298: allDrv()
4299: chargeVehicleId()
4311: enviarPedidoParcialAsaas()
4327: pedirPixParcial()
4345: restaurarPixTotal()
4351: responderPixParcial()
4375: contrato30Info()
4405: encerrarContrato()
4422: encerrarContratoPrompt()
4435: reativarContrato()
4459: marcarCaucaoPagoArquivar()
4480: desarquivarFicha()
4498: deliveryInspectionHtml()
4537: uploadDeliveryPhotos()
4564: delDeliveryPhoto()
4582: addCauDesconto()
4607: puxarMultaCaucao()
4628: delCauDesconto()
4650: dfCauDescontosHtml()
4683: dfContratoRender()
4727: encerrarContratoConfirmFicha()
4734: renderMasterPanel()
4899: renderArchivedDrivers()
4944: handleAddVehicle()
4984: deleteVehicle()
4985: cancelDeleteVehicle()
4987: confirmDeleteVehicle()
5011: abrirEditarVeiculo()
5033: evReadStoredCrlv()
5058: evReadChosenCrlv()
5074: fecharEditarVeiculo()
5075: salvarEditarVeiculo()
5112: drvCauMostra()
5119: drvCauLer()
5127: handleAddDriver()
5205: marcarSituacao()
5215: updateDriverPaymentStatus()
5226: cobrancaAberta()
5230: proximoDiaISO()
5231: mudarDiaPagamento()
5242: aplicarDiaPagamento()
5272: deleteDriver()
5273: cancelDeleteDriver()
5275: confirmDeleteDriver()
5297: isImageFile()
5299: prepareFile()
5321: uploadFile()
5332: fileUrl()
5343: downloadName()
5347: renderFilePreview()
5367: renderPdfToCanvas()
5394: viewDoc()
5415: **DINHEIRO**
5416: parseMoney()
5423: fmtMoney()
5424: fmtDate()
5425: todayISO()
5427: **CONFIGURAÇÕES (Gemini e Google Drive)**
5429: loadConfigStatus()
5434: paintConfig()
5439: fillOwnerVehicleSelect()
5445: saveOwnerVehicle()
5467: locadorMerged()
5480: getLocadoresList()
5500: locadorForVehicle()
5509: fillLocadorSettings()
5529: cfgOnLocadorChange()
5530: upsertLocadorInList()
5560: deleteLocadorSetting()
5576: saveLocadorSettings()
5604: openSettings()
5622: fillWhatsLocadora()
5630: salvarWhatsLocadora()
5644: carregarWaApi()
5662: salvarWaApi()
5677: waApiTexto()
5690: waApiAcao()
5701: ligarWaApi()
5714: closeSettings()
5715: saveConfig()
5725: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5726: renderAsaasDrivers()
5753: toggleDriverAsaas()
5785: getAtrasoCfg()
5789: fillAtrasoCfg()
5796: saveAtrasoCfg()
5813: atrasoDataBR()
5818: atrasoPrazoUtil()
5825: calcEncargosAtraso()
5844: ehLinhaEncargo()
5845: calcAtrasoMotorista()
5875: atualizarPixAtraso()
5888: loadAsaasInfo()
5902: saveAsaas()
5910: testarAsaas()
5917: copiarAsaas()
5921: testDrive()
5928: resyncDrive()
5936: **FICHA DO MOTORISTA**
5939: openDriverFile()
5971: closeDriverFile()
5973: saveDriverFile()
6040: aiFillDriver()
6079: **CONTROLE FINANCEIRO**
6080: finRange()
6097: dayBR()
6098: inRange()
6100: onFinPeriodChange()
6106: fillFinFilters()
6114: clearFinFilters()
6118: updateFinFilterCount()
6127: openFinance()
6133: switchFinTab()
6144: finCardBtn()
6152: closeFinCardDetail()
6153: closeFinance()
6155: collectRentFinData()
6206: renderFinance()
6264: openFinCardDetail()
6471: openFinExtrato()
6565: renderFinExtratoView()
6646: openFinExtratoReport()
6663: renderFinGrafico()
6683: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6685: okEmail()
6687: openEmailCompose()
6708: closeEmailCompose()
6709: sendEmailCompose()
6724: emailRecibo()
6729: emailIA()
6737: **RELATÓRIO DO FINANCEIRO**
6739: finFiltersText()
6744: finPeriodText()
6751: buildReportHtml()
6773: openFinReport()
6783: closeFinReport()
6784: printFinReport()
6788: shareFinReport()
6798: emailFinReport()
6804: **DESPESAS DO VEÍCULO**
6806: openExpenses()
6818: closeExpenses()
6819: fillExpenseTypes()
6824: createExpenseType()
6839: aiReadExpense()
6871: renderExpenses()
6893: saveExpense()
6920: deleteExpense()
6949: inspSlotLabel()
6952: normalizeInspDbSlot()
6955: photoDamageBadge()
6964: buildVehicleInspectionReport()
7001: copyVehicleInspectionText()
7009: photoCard()
7051: inspectionHtml()
7131: hydrateImages()
7137: openInspection()
7145: closeInspection()
7149: renderInspectionModal()
7156: uploadInspection()
7213: deleteInspectionPhoto()
7233: fmtDue()
7239: nextDueLocal()
7250: openNewPix()
7280: **CAUÇÃO DO MOTORISTA**
7281: cauOf()
7282: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7283: devOf()
7284: devCobrancas()
7286: devPrevisao()
7294: dfDevRender()
7321: dfDevIr()
7322: dfDevSalvar()
7327: dfDevAvisar()
7333: dfDevDesfazer()
7337: dfDevReceber()
7346: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7350: cauPlano()
7358: cauParcela()
7365: cauParcelasTexto()
7369: cauNext()
7376: dfCauFill()
7386: dfCauCalc()
7414: dfCauRead()
7427: expTypeName()
7431: driverFinVehicleId()
7443: cauEntradaItem()
7457: cauPagoDespesaItem()
7472: **CAUÇÃO: quanto já foi pago**
7474: cauStatus()
7484: obsResumoHtml()
7485: cauResumoHtml()
7490: **MULTAS E OUTRAS DESPESAS**
7491: multasOf()
7493: multaPagaAuto()
7498: multasAbertas()
7499: multasPendentes()
7500: multasResumoHtml()
7508: cobOf()
7509: dfCobFill()
7515: dfCobRead()
7518: dfCobInfo()
7528: cobResumoHtml()
7532: ajustesOf()
7536: ajusteVale()
7537: isoDia()
7539: vencProxima()
7540: previsaoProxima()
7554: previsaoHtml()
7558: dfAjRender()
7564: addAjuste()
7573: delAjuste()
7578: abrirAjustes()
7579: renderProxCobrancas()
7585: savePixExtra()
7593: dfMultFill()
7601: fdPaga()
7602: dfMultRender()
7611: toggleMultas()
7618: addMulta()
7628: delMulta()
7636: multaPaga()
7645: renderDriverExtras()
7673: mondayAfter()
7681: renderDriverProfileExtras()
7747: semanaDoPix()
7753: **MEUS RECIBOS (área do motorista)**
7755: meusRecibosLista()
7759: reciboRowHtml()
7767: renderEncerradoRecibos()
7772: openMeuReciboDireto()
7776: abrirAvisoDev()
7782: fecharAvisoDev()
7783: avisoDevTexto()
7790: enviarAvisoDev()
7810: openMeusRecibos()
7817: closeMeusRecibos()
7818: reciboPdfHtml()
7829: verMeuRecibo()
7836: voltarMeusRecibos()
7837: pdfMeuRecibo()
7841: shareMeuRecibo()
7850: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7851: editVehicleRent()
7868: nextParcel()
7874: fillNewPixValues()
7910: newPixParts()
7941: **PERÍODO E VENCIMENTO DA COBRANÇA**
7942: dataISO()
7943: dataDe()
7944: dataMais()
7945: dataBR()
7946: diasEntre()
7947: isoSP()
7948: pixPeriodo()
7955: pixDesc()
7956: pixDiasPeriodo()
7961: marcarAjustesPorVenc()
7966: pixDatasNovo()
7975: pixDatasMudou()
7986: pixAluguelProporcional()
7994: pixPeriodoInfo()
8007: pixAddLinha()
8014: pixLinhas()
8016: descSoma()
8026: calcNewPix()
8035: **RECIBO DE PAGAMENTO**
8039: receiptValue()
8040: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
8041: atrasoDados()
8045: cobrarAtraso()
8062: allocatePix()
8081: reciboData()
8104: fmtDateTimeBR()
8105: reciboTexto()
8156: openRecibo()
8173: closeRecibo()
8174: **CORRIGIR RECIBO**
8176: corrigirLinhaHtml()
8186: openCorrigirRecibo()
8209: closeCorrigirRecibo()
8210: corrigirLer()
8216: corrigirSoma()
8223: salvarCorrigirRecibo()
8240: copyRecibo()
8245: reciboCanvas()
8262: reciboPdfBlob()
8280: shareReciboPdf()
8296: rotularTabelas()
8314: areaAberta()
8315: markAreas()
8325: closeAreas()
8329: toggleArea()
8337: dobraSalva()
8338: setDobra()
8343: toggleDobra()
8350: dobraTopo()
8357: renderMasterResumo()
8371: renderMasterTopo()
8393: loadIA()
8415: updateIABadge()
8420: loadIASetting()
8426: paintIASwitch()
8432: toggleIA()
8439: loadRobo()
8448: iaPrepararQr()
8453: paintRobo()
8482: pedirCodigoRobo()
8491: toggleRobo()
8506: iaTodosGerar()
8524: iaTodosCancelar()
8528: iaTodosConfirmar()
8542: loadIARules()
8547: iaAbrirPdf()
8553: renderIARules()
8557: saveIARules()
8562: addIARule()
8567: delIARule()
8571: openIA()
8586: closeIA()
8587: iaShow()
8588: iaPhone()
8593: renderIA()
8635: iaAprovar()
8644: iaPhone2()
8645: iaSend()
8676: iaMark()
8687: iaDelete()
8698: openPixArea()
8707: closePixArea()
8708: renderPixArea()
8752: openEditPix()
8781: deletePix()
8793: closeNewPix()
8795: saveNewPix()
8886: pushSupported()
8887: isIOS()
8888: isStandalone()
8889: b64ToBytes()
8895: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8900: notifStatus()
8908: stepsList()
8912: notifHelpHtml()
8946: renderNotifModal()
8958: checkDriverNotifications()
8991: activateFromModal()
9004: refreshNotifButton()
9023: subscribePush()
9038: enableNotifications()
9058: closeDocViewer()
9066: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
9078: allFeaturesOn()
9079: feat()
9080: loadDriverFeatures()
9087: saveDriverFeatures()
9092: drawFeatureToggles()
9107: setAllFeatures()
9118: applyDriverFeatures()
9133: **PIX: conferência do código e QR code desenhado no aparelho**
9134: crc16()
9142: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
9144: pixTxt()
9145: pixCampo()
9146: pixGerarCodigo()
9156: pixAutoLigado()
9157: pixAutoMudou()
9162: gerarPixAuto()
9178: pixRecebedorCarregar()
9189: pixRecebedorGuardar()
9196: pixValid()
9202: renderPixQr()
9212: previewNewPixQr()
9222: **FOTO DO MOTORISTA (recortada da CNH)**
9223: photoPath()
9224: fileToCanvas()
9243: cropPhoto()
9257: savePhoto()
9262: photoBoxFrom()
9268: fillAvatar()
9279: fillAvatars()
9292: storedFile()
9299: photoFromCnh()
9311: **FOTO DO PERFIL ACOMPANHA A CNH**
9314: cnhStamp()
9315: photoFiles()
9323: avatarPath()
9328: syncCnhPhotos()
9352: pickImage()
9355: changeDriverPhoto()
9371: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9373: uploadTmp()
9380: clearTmp()
9385: aiReadFiles()
9391: okDateISO()
9393: noAccents()
9395: makeUsername()
9404: titleCase()
9405: syncNewDriverAccess()
9411: setNewDriverPhoto()
9416: pickNewDriverPhoto()
9420: resetNewDriverForm()
9428: newDriverDocChosen()
9462: anoCrlv()
9466: formatVehicleBrand()
9471: inferVehicleBrand()
9480: normalizeCrlvFields()
9499: applyCrlvFields()
9512: aiReadCrlv()
9526: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9527: sendWelcomeEmail()
9533: showCredentials()
9544: demoAssistente()
9563: **PERGUNTAR À IA (ÁREA IA, só o master)**
9567: iaChatReset()
9568: iaNorm()
9569: iaAcha()
9575: iaVeicTxt()
9576: iaCamposVeic()
9577: iaDataOk()
9578: iaOpcoes()
9579: iaTodosMotoristas()
9583: iaFerramenta()
9678: renderIAChat()
9695: iaChatDica()
9696: iaChatEnviar()
9731: iaChatNota()
9732: iaCancelarCartao()
9733: iaConfirmarCartao()
9778: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9779: syncAppFinState()
9788: renderAppEarnings()
9868: saveAppEarning()
9895: workDayISO()
9896: paintDayOff()
9905: renderDayOff()
9912: setDayOff()
9922: aiReadEarning()
9955: **DESPESAS DO APLICATIVO**
9957: appExpCustomTypes()
9958: fillAppExpTypes()
9965: onAppExpTypeChange()
9970: saveAppExpense()
9995: deleteAppExpense()
10004: deleteAppEarning()
10101: loadTermsAcceptances()
10113: termsOf()
10114: currentAcceptance()
10115: needsTermsAcceptance()
10118: fmtDateTime()
10121: termsPlainText()
10125: termsHash()
10133: openTermsGate()
10156: termsGateCheck()
10164: acceptTerms()
10184: acceptanceHtml()
10195: openTermsViewer()
10213: closeTerms()
10219: downloadTermsCopy()
10240: termsBadgeMaster()
10247: termsMasterDetail()
10288: renderTermsSetupBanner()
10301: copyTermsSql()
10311: cnhExpired()
10312: cnhWaiting()
10313: onlyDigits()
10314: normName()
10316: verifyCnh()
10328: renderCnhBanner()
10346: sendNewCnh()
10394: cnhBadgeMaster()
10402: applyPendingCnh()
10410: autoReadNewCnhs()
10428: cnhPendingHtml()
10442: recheckPendingCnh()
10452: rejectPendingCnh()
10462: showContractDoc()
10580: inspectPdfSignaturesBytes()
10599: readPdfFileAsBase64AndInspect()
10614: govBrSignersList()
10626: renderGovBrFlowBox()
10678: driverGovBrBlockHtml()
10707: govBrPublicAppBaseUrl()
10711: createGovBrInvite()
10743: submitMasterGovBrPdf()
10764: submitDriverGovBrPdf()
10783: loadGovBrInvitePage()
10854: submitGovBrInvitePdf()
10873: exitGovBrInviteToLogin()
10892: contractPeriodLabel()
10893: contractStatusBadge()
10897: pdfSafeText()
10909: contractPdfFileName()
10918: cwBuildDepositChargeText()
10960: cwBuildDepositClauseText()
10972: lcClauseStart()
10979: buildDefaultClauses()
11050: generateContractPdfBytes()
11069: drawHeader()
11074: newPage()
11081: ensureSpace()
11084: wrapLines()
11108: drawJustifiedLine()
11374: renderContractsTab()
11428: renderDriverRentalContractsBox()
11487: openContractForDriver()
11494: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11496: closeContractWizard()
11497: cwPopulateSelects()
11505: cwPopulateLocadores()
11517: cwOnLocadorChange()
11526: defaultWitness1ForLocador()
11534: cwApplyDefaultWitness1()
11547: cwFillLocador()
11556: cwFillDepositFromDriver()
11584: cwFillDepositFromComercial()
11606: cwSyncClauseIdx()
11615: cwSyncDepositClauseOnly()
11616: cwUpdateTrialPreview()
11632: cwDepCalc()
11677: cwApplyDriverContractDefaults()
11694: cwFillDriver()
11713: cwUpdateCrlvBar()
11722: cwNeedsCrlvFill()
11726: cwRefreshMissingBoxIfVisible()
11735: cwReadVehicleCrlv()
11784: cwReadCurrentVehicleCrlv()
11790: cwFillVehicle()
11812: cwOnDriverChange()
11828: cwOnVehicleChange()
11841: cwDefaultChecklist()
11846: cwToggleVistoriaFields()
11851: cwRenderInspChecklist()
11870: cwRenderInspDamagesSummary()
11884: cwRenderInspPhotos()
11921: cwUpdateInspPhotoDamage()
11929: cwSyncVistoriaFromVehicle()
11946: cwImportSavedPhotos()
11962: cwUploadInspPhotos()
12002: cwAnalyzeInspWithAI()
12011: cwReadSnapshot()
12070: cwRenderClausesEditor()
12080: cwRebuildClauses()
12088: cwRenderPreview()
12143: cwTogglePreview()
12148: validateContractForEmission()
12165: openContractWizard()
12300: cwSyncSources()
12355: logContractHistory()
12364: persistContract()
12455: saveContractDraft()
12456: emitContract()
12458: ensureContractPdfBlob()
12469: downloadContractPdf()
12481: printContractPdf()
12494: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12495: closeContractDetail()
12496: openContractDetail()
12569: saveContractSignatures()
12596: uploadSignedContractFile()
12618: terminateContractPrompt()
12633: clearDriverPathsIfMatching()
12643: cancelContractPrompt()
12659: deleteContractPrompt()
12713: inspectionTypeBadge()
12717: inspectionStatusBadge()
12721: inspectionPdfFileName()
12728: switchContractsSubtab()
12741: renderInspectionsTab()
12801: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12802: runInspectionBatchAI()
12825: promptInspectionDamageConfirmation()
12903: processInspectionPhotosWithAI()
12959: analyzeSavedInspectionPhotos()
12975: renameInspectionPhoto()
12991: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12994: closeInspectionWizard()
12995: openInspectionWizard()
13059: iwCollectSavedPhotosFor()
13092: iwPopulateContractsAndBase()
13115: iwSyncHeaderAndLegal()
13127: iwOnTypeChange()
13133: iwOnVehicleChange()
13151: iwOnDriverChange()
13156: iwOnContractChange()
13163: iwImportSavedPhotos()
13174: iwUploadPhotos()
13227: iwResolveEntregaBaseline()
13248: iwRunAIOnList()
13274: iwAnalyzeWithAI()
13281: iwRenderPhotos()
13320: iwUpdatePhotoField()
13325: iwUpdatePhotoDamage()
13333: iwRemovePhoto()
13339: iwRenderDamagesSummary()
13354: iwRenderComparison()
13373: iwRenderChecklist()
13392: persistInspectionTerm()
13495: saveInspectionDraft()
13496: emitInspectionTerm()
13498: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13499: blobToEmbeddableJpeg()
13529: embedBlobIntoPdf()
13542: generateInspectionPdfBytes()
13742: ensureInspectionPdfBlob()
13752: downloadInspectionPdf()
13764: printInspectionPdf()
13777: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13778: closeInspectionDetail()
13779: openInspectionDetail()
13839: saveInspectionSignatures()
13865: uploadSignedInspectionFile()
13887: cancelInspectionPrompt()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/ar-aviso/index.ts (84 linhas)

11: json()
12: secret()
14: mandar()
32: ceuMetar()

## supabase/functions/ar-caes/index.ts (84 linhas)

11: json()
12: secret()
15: limpar()
17: configurar()
23: enviar()

## supabase/functions/ar-siri/index.ts (28 linhas)

6: texto()

## supabase/functions/motora-asaas/index.ts (656 linhas)

22: serviceKey()
29: json()
31: brl()
32: r2()
36: secret()
41: asaas()
54: avisar()
64: hojeBR()
65: proximoDia()
72: proximaParcela()
83: cauParcela()
92: ajusteVale()
95: tirarAjustes()
103: getAtrasoConfig()
107: atrasoDataBR()
112: atrasoPrazoUtil()
119: calcEncargosAtraso()
137: ehLinhaEncargo()
139: cobrarMotorista()
152: *valores (mesma regra do Novo Pix)*
180: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
183: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
204: criarQrAsaasEUpload()
227: saldoAbertoMotorista()
287: salvarQrParcialNoPerfil()
298: atualizarQrAtrasoMotorista()
332: cobrarTodos()
363: *pagamento recebido*
364: quemPagou()
387: pagamentoRecebido()
477: usuarioAuth()
486: ehMaster()
491: pixParcialMotorista()
550: autorizarParcial()
591: preparar()
592: limpa()
627: acao "pix_parcial"
630: acao "autorizar_parcial"
635: acao "preparar"
638: acao "atualizar_atraso"
649: acao "cobrar"

## supabase/functions/motora-assinatura/index.ts (542 linhas)

7: serviceKey()
27: json()
47: maskCpf()
53: inspectPdfSignatures()
77: makeToken()
84: resolveDoc()
92: publicDocSummary()
129: authUser()

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (367 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
124: r2()
125: atrasoDataBR()
130: atrasoPrazoUtil()
137: calcEncargosAtraso()
155: ehLinhaEncargo()
158: emAberto()
181: avisoAtraso()
204: **4) PIX AUTOMÁTICO DO MOTORA**
206: crc16()
211: campo()
212: txtPix()
213: codigoPix()
220: chaveNormal()
227: proximaParcela()
235: pixAutomatico()
242: *valores (mesma regra do Novo Pix e do Asaas)*
269: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
290: pixAutoTodos()
314: enviar()
323: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (444 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
112: baseMessage()
116: textoNovoPix()
123: regrasDono()
128: lerMensagem()
137: iaEscreve()
154: iaReescreveTodos()
168: motoristasDoAviso()
174: reciboDados()
199: gerarPdfRecibo()
203: limpa()
223: queueWhatsApp()
248: norm()
271: **fim da Área IA**
277: textoBoasVindas()
301: sendToDriver()
314: type "public_key"
323: type "sunday"
331: type "recibo_teste"
335: type "master_alert"
339: type "driver_alert"
351: type "test"
359: type "aprovar_msg"
370: type "todos_rascunho"
378: type "todos_enviar"
388: type "new_pix"
400: type "boas_vindas"
415: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## supabase/functions/motora-sync/index.ts (573 linhas)

5: serviceKey()
17: json()
19: secret()
24: readFile()
33: drive()
42: stamp()
44: driverInfo()
50: syncDoc()
58: uploadReceipt()
66: syncPix()
78: syncExpense()
91: *DOCUMENTOS DO VEÍCULO, VISTORIA E TERMOS (envio automático ao Drive)*
92: vehicleInfo()
98: syncVehicleDoc()
105: syncInspection()
113: escHtml()
114: syncTerms()
129: *fim*
131: *E-MAIL: a IA escreve, o dono confere no app e confirma o envio*
132: regrasDono()
137: emailDraft()
155: sendEmail()
163: *fim do e-mail*
165: **LEITURA DE DOCUMENTOS E VISTORIA COM IA (Gemini)**
168: modelosGemini()
184: callGemini()
238: expensePrompt()
246: earningPrompt()
258: callGeminiDriver()
260: aiReadFiles()
273: aiAnalyzeInspection()
314: driverWelcome()
329: *CONFERÊNCIA DE COMPROVANTE COM IA*
336: geminiOnFiles()
346: nameWords()
350: brl()
351: dBR()
353: pushAlert()
362: notifyMasters()
363: notifyDriver()
365: verifyReceipt()
372: save()
421: checkDriverCnh()
436: dig()
457: driverCnhCheck()
467: dig()
492: aiRead()
514: type "doc"
515: type "receipt"
516: type "pix"
517: type "expense"
518: type "vehicle_doc"
519: type "inspection"
520: type "terms"
521: type "verify_receipt"
522: type "driver_cnh"
531: type "driver_cnh_check"
534: type "ai_read"
535: type "verify_receipt"
536: type "ai_read_files"
541: type "ai_analyze_inspection"
546: type "driver_welcome"
547: type "email_draft"
548: type "send_email"
550: type "drive_ping"
551: type "drive_resync"

## supabase/functions/motora-whatsapp/index.ts (324 linhas)

22: serviceKey()
29: json()
36: brl()
38: *modelos de mensagem (a Meta aprova uma vez; depois o app só preenche os {{n}})*
65: *configuração*
66: secret()
70: config()
76: graph()
85: avisarDono()
94: *montar a mensagem de cada linha da fila*
95: plano()
96: numeroWa()
101: ehPix()
102: vencTexto()
111: codigoPix()
116: linkArquivo()
120: param()
122: montar()
146: mandarModelo()
154: *fila*
155: enviarFila()
194: *criar os modelos na Meta*
195: enviarArquivoExemplo()
206: exemploQr()
210: exemploPdf()
218: criarModelos()
239: situacao()
256: teste()
265: *aviso da Meta (webhook)*
266: assinaturaOk()
275: avisoMeta()
285: ehMaster()
313: acao "enviar_fila"
314: acao "modelos"
315: acao "situacao"
316: acao "teste"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-atraso-juros-asaas.sql: MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
- supabase/2026-11-12-modulo-vistorias.sql: Módulo Unificado de Vistorias Veiculares e Devolução com IA (12/11/2026)
- supabase/2026-11-13-govbr-assinaturas.sql: Fluxo oficial de assinaturas eletrônicas via Portal GOV.BR (assinador.iti.br)
- supabase/2026-11-14-ar-acorda.sql: Nossa casinha (14/11/2026, placa versão 9): comando na hora. Cada comando novo em ar.cmd manda um "cutucão" pelo
- supabase/2026-11-14-ar-aviso.sql: Nossa casinha: notificação ao dono quando o ar liga ou desliga sem ele ter pedido (14/11/2026).
- supabase/2026-11-14-ar-evento.sql: Nossa casinha (14/11/2026): o bloco do ar mostra quem ligou/desligou e a que horas ("Desligado pelo automático às 18:20").
- supabase/2026-11-14-ar-historico.sql: Nossa casinha (14/11/2026): histórico para "Uso do ar" (horas ligado por dia), "24 h" (temperatura a cada 5 min com o
- supabase/2026-11-14-ar-push.sql: Nossa casinha: avisos no celular pelo próprio app (14/11/2026). Antes os avisos do ar iam como "master_alert" do
- supabase/2026-11-14-ar-siri.sql: Siri do "Nossa casinha": atalho do iPhone manda a frase para a função ar-siri, que usa uma chave só do dono.
- supabase/2026-11-14-ar-temp-dia.sql: Nossa casinha: máxima e mínima do quarto por dia (14/11/2026), para o gráfico "Temperatura máxima · últimos 7 dias".
- supabase/2026-11-15-ar-caes.sql: Nossa casinha: avisos de fome e sede dos cachorros Elvis, Belinha e Maya (15/11/2026).
- supabase/2026-11-15-ar-fora-real.sql: Nossa casinha: temperatura de lá fora MEDIDA, não prevista (15/11/2026, pedido do dono).
- supabase/2026-11-15-ar-janela.sql: Nossa casinha: lá fora mais frio = abrir a janela (15/11/2026, pedido do dono; placa versão 20).
- supabase/2026-11-23-ar-claudinho.sql: Nossa casinha (23/11/2026): comandos diretos (texto e áudio) do app para o Claudinho (J7) pela nuvem.
- supabase/2026-11-25-atraso-madrugada.sql: PIX DE ATRASO LOGO DEPOIS DA MEIA-NOITE (25/11/2026; já aplicado no Supabase)
- supabase/2026-11-25-aviso-devolucao.sql: AVISO DE DEVOLUÇÃO PELO MOTORISTA (25/11/2026, pedido do dono). Já aplicado no Supabase.
- supabase/2026-11-25-mudar-dia-pagamento.sql: MUDAR DIA DO PAGAMENTO e levar junto a cobrança em aberto (25/11/2026, pedido do dono; caso da Argelia)
- supabase/2026-11-25-whatsapp-api.sql: WHATSAPP OFICIAL (API da Meta) NO LUGAR DO ROBÔ (25/11/2026, pedido do dono). Já aplicado no Supabase.
- supabase/2026-11-25-whatsapp-locadora.sql: WHATSAPP DA LOCADORA (25/11/2026, pedido do dono). Já aplicado no Supabase.
