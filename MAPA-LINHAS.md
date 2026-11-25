# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 25/11/2026, 06:21:30. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13703 linhas)

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
285: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
290: <!-- Aviso: nova versão do app Android -->
293: <!-- Aviso vermelho: notificações desligadas -->
296: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
300: <!-- Aviso de Pix / pagamento pendente -->
303: <!-- Navegação de Abas -->
321: <!-- Conteúdo das Abas Motorista -->
324: <!-- Aba CRLV-e -->
325: #tabDrvCrlv
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Contrato -->
335: #tabDrvContract
345: <!-- Renderizado dinamicamente -->
349: <!-- Aba Vistoria -->
350: #tabDrvInspection
357: <!-- Aba Pagamento -->
358: #tabDrvPayment
371: <!-- Caução e multas do motorista -->
373: <!-- Valor e descrição da cobrança -->
383: <!-- Seção Pix -->
397: <!-- QR Code Renderizado aqui -->
430: <!-- Seção Upload de Comprovante -->
447: <!-- Lista de comprovantes -->
452: <!-- Recibos quando o contrato está encerrado -->
459: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
460: #secMasterPanel
500: <!-- Aviso: falta criar a tabela dos termos no banco -->
503: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
505: <!-- Lista de Veículos -->
521: <!-- Renderizado via JS -->
528: <!-- Form de Adicionar Veículo -->
575: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
675: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
681: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
686: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
691: <!-- Fichas Arquivadas (após marcar caução pago) -->
700: <!-- Form de Adicionar Motorista -->
795: <!-- Barra de baixo do dono (só no design novo) -->
806: <!-- MODAL PRIMEIRO LOGIN -->
807: #modalFirstLogin
841: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
842: #modalNotif
855: <!-- MODAL VISTORIA (MASTER) -->
856: #modalInspection
869: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
870: #modalSettings
1003: <!-- MODAL TEMAS -->
1004: #modalThemes
1015: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1016: #modalCreds
1031: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1046: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1047: #modalDriverFile
1089: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1093: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1122: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1137: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1179: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1180: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1181: #modalRecibo
1200: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1201: #modalPixArea
1217: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1218: #modalIA
1300: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1301: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1302: #modalEditVeh
1339: #modalSenha
1361: #modalMeusRecibos
1379: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1380: #modalEmail
1400: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1401: #modalReport
1416: #modalFinCardDetail
1429: #modalFinance
1462: <!-- FILTROS -->
1512: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1532: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1533: #modalExpenses
1568: <!-- MODAL NOVO PIX -->
1569: #modalNewPix
1621: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1679: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1680: #modalCorrigirRecibo
1694: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1695: #modalContractWizard
1711: <!-- Seleção Motorista & Veículo -->
1723: <!-- Locador -->
1744: <!-- Locatário -->
1765: <!-- Veículo -->
1788: <!-- Configuração Comercial -->
1864: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1932: <!-- Cláusulas editáveis -->
1944: <!-- Prévia -->
1958: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1959: #modalContractDetail
1972: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1973: #modalInspectionTerm
2034: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2057: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2097: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2098: #modalInspectionTermDetail
2111: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2112: #modalInspDamageConfirm
2127: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2128: #modalDocViewer
2136: #modalDocBody
2137: <!-- Conteúdo pré-visualizado -->
2143: #modalTerms
2157: <!-- NOTIFICAÇÕES TOAST -->
2174: lsGet()
2175: lsSet()
2176: lsDel()
2199: demoLoginRole()
2203: demoId()
2204: demoSave()
2205: demoSaved()
2207: *datas no horário de Brasília*
2208: demoLocal()
2209: demoParts()
2210: demoDay()
2211: demoNextDue()
2216: *dados fictícios (4 meses)*
2217: demoBuild()
2450: *documentos fictícios (imagem gerada na hora)*
2451: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2452: demoDocBlob()
2530: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2531: demoQuery()
2554: out()
2560: run()
2601: demoOnUpdate()
2611: demoOnInsert()
2736: demoClient()
2939: demoStart()
2947: demoStop()
2953: abrirDemo()
2960: trocarDemo()
2965: demoBanner()
2980: toEmail()
2984: showLogin()
2988: esc()
2993: toBRTInput()
3006: parseBRTInputToIso()
3015: dataHoraBR()
3029: uiDialogo()
3077: uiConfirm()
3086: uiPrompt()
3092: friendlyError()
3102: unwrapInvokeResult()
3122: devicePrefs()
3125: saveDevicePrefs()
3128: docRef()
3129: viewDocIdx()
3131: setBusy()
3174: **TEMAS**
3183: currentTheme()
3188: applyTheme()
3189: openThemes()
3199: pickTheme()
3205: toggleDarkMode()
3207: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3209: loadDesignCfg()
3216: applyDesign()
3233: markMasterNav()
3240: fillDesignCfg()
3245: saveDesign()
3259: showToast()
3268: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3269: senhaErro()
3270: abrirSenha()
3279: salvarIaCodigo()
3289: fecharSenha()
3290: salvarSenha()
3311: loginUserInput()
3316: loginErro()
3320: verSenha()
3325: handleLogin()
3374: logout()
3393: saveFirstLoginPreferences()
3416: carregarDados()
3448: aplicarDados()
3489: loadAndRender()
3516: autoRefresh()
3555: markUpdated()
3560: reload()
3565: renderApp()
3613: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3616: masterBack()
3618: viewAsDriver()
3640: exitViewAs()
3659: viewOnly()
3660: renderViewAsBanner()
3670: showSection()
3675: withBtn()
3683: toggleDriverStatus()
3692: isOnline()
3694: updateStatusToggleUI()
3707: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3716: checkApkUpdate()
3731: updateInstallApkButton()
3751: renderDriverPanel()
4009: switchDriverTab()
4024: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
4027: parsePixKey()
4031: normalizePixKey()
4039: pixKeyLooksOk()
4047: togglePixKeyFields()
4053: updatePixKeyPlaceholder()
4059: copyPixKey()
4066: copyPixCode()
4078: receiptBadge()
4088: receiptMasterBox()
4115: receiptAction()
4122: confirmReceipt()
4151: rejectReceipt()
4163: recheckReceipt()
4172: uploadReceipt()
4195: switchMasterTab()
4214: maskPhone()
4223: waLink()
4228: allVeh()
4229: allDrv()
4230: chargeVehicleId()
4242: enviarPedidoParcialAsaas()
4258: pedirPixParcial()
4276: restaurarPixTotal()
4282: responderPixParcial()
4306: contrato30Info()
4336: encerrarContrato()
4353: encerrarContratoPrompt()
4366: reativarContrato()
4390: marcarCaucaoPagoArquivar()
4411: desarquivarFicha()
4429: deliveryInspectionHtml()
4468: uploadDeliveryPhotos()
4495: delDeliveryPhoto()
4513: addCauDesconto()
4538: puxarMultaCaucao()
4559: delCauDesconto()
4581: dfCauDescontosHtml()
4614: dfContratoRender()
4658: encerrarContratoConfirmFicha()
4665: renderMasterPanel()
4830: renderArchivedDrivers()
4875: handleAddVehicle()
4915: deleteVehicle()
4916: cancelDeleteVehicle()
4918: confirmDeleteVehicle()
4942: abrirEditarVeiculo()
4964: evReadStoredCrlv()
4989: evReadChosenCrlv()
5005: fecharEditarVeiculo()
5006: salvarEditarVeiculo()
5043: drvCauMostra()
5050: drvCauLer()
5058: handleAddDriver()
5136: marcarSituacao()
5146: updateDriverPaymentStatus()
5157: cobrancaAberta()
5161: proximoDiaISO()
5162: mudarDiaPagamento()
5173: aplicarDiaPagamento()
5203: deleteDriver()
5204: cancelDeleteDriver()
5206: confirmDeleteDriver()
5228: isImageFile()
5230: prepareFile()
5252: uploadFile()
5263: fileUrl()
5274: downloadName()
5278: renderFilePreview()
5298: renderPdfToCanvas()
5325: viewDoc()
5346: **DINHEIRO**
5347: parseMoney()
5354: fmtMoney()
5355: fmtDate()
5356: todayISO()
5358: **CONFIGURAÇÕES (Gemini e Google Drive)**
5360: loadConfigStatus()
5365: paintConfig()
5370: fillOwnerVehicleSelect()
5376: saveOwnerVehicle()
5398: locadorMerged()
5411: getLocadoresList()
5431: locadorForVehicle()
5440: fillLocadorSettings()
5460: cfgOnLocadorChange()
5461: upsertLocadorInList()
5491: deleteLocadorSetting()
5507: saveLocadorSettings()
5535: openSettings()
5550: closeSettings()
5551: saveConfig()
5561: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5562: renderAsaasDrivers()
5589: toggleDriverAsaas()
5621: getAtrasoCfg()
5625: fillAtrasoCfg()
5632: saveAtrasoCfg()
5649: atrasoDataBR()
5654: atrasoPrazoUtil()
5661: calcEncargosAtraso()
5680: ehLinhaEncargo()
5681: calcAtrasoMotorista()
5711: atualizarPixAtraso()
5724: loadAsaasInfo()
5738: saveAsaas()
5746: testarAsaas()
5753: copiarAsaas()
5757: testDrive()
5764: resyncDrive()
5772: **FICHA DO MOTORISTA**
5775: openDriverFile()
5807: closeDriverFile()
5809: saveDriverFile()
5876: aiFillDriver()
5915: **CONTROLE FINANCEIRO**
5916: finRange()
5933: dayBR()
5934: inRange()
5936: onFinPeriodChange()
5942: fillFinFilters()
5950: clearFinFilters()
5954: updateFinFilterCount()
5963: openFinance()
5969: switchFinTab()
5980: finCardBtn()
5988: closeFinCardDetail()
5989: closeFinance()
5991: collectRentFinData()
6042: renderFinance()
6100: openFinCardDetail()
6307: openFinExtrato()
6401: renderFinExtratoView()
6482: openFinExtratoReport()
6499: renderFinGrafico()
6519: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6521: okEmail()
6523: openEmailCompose()
6544: closeEmailCompose()
6545: sendEmailCompose()
6560: emailRecibo()
6565: emailIA()
6573: **RELATÓRIO DO FINANCEIRO**
6575: finFiltersText()
6580: finPeriodText()
6587: buildReportHtml()
6609: openFinReport()
6619: closeFinReport()
6620: printFinReport()
6624: shareFinReport()
6634: emailFinReport()
6640: **DESPESAS DO VEÍCULO**
6642: openExpenses()
6654: closeExpenses()
6655: fillExpenseTypes()
6660: createExpenseType()
6675: aiReadExpense()
6707: renderExpenses()
6729: saveExpense()
6756: deleteExpense()
6785: inspSlotLabel()
6788: normalizeInspDbSlot()
6791: photoDamageBadge()
6800: buildVehicleInspectionReport()
6837: copyVehicleInspectionText()
6845: photoCard()
6887: inspectionHtml()
6967: hydrateImages()
6973: openInspection()
6981: closeInspection()
6985: renderInspectionModal()
6992: uploadInspection()
7049: deleteInspectionPhoto()
7069: fmtDue()
7075: nextDueLocal()
7086: openNewPix()
7116: **CAUÇÃO DO MOTORISTA**
7117: cauOf()
7118: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7119: devOf()
7120: devCobrancas()
7122: devPrevisao()
7130: dfDevRender()
7157: dfDevIr()
7158: dfDevSalvar()
7163: dfDevAvisar()
7169: dfDevDesfazer()
7173: dfDevReceber()
7182: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7186: cauPlano()
7194: cauParcela()
7201: cauParcelasTexto()
7205: cauNext()
7212: dfCauFill()
7222: dfCauCalc()
7250: dfCauRead()
7263: expTypeName()
7267: driverFinVehicleId()
7279: cauEntradaItem()
7293: cauPagoDespesaItem()
7308: **CAUÇÃO: quanto já foi pago**
7310: cauStatus()
7320: obsResumoHtml()
7321: cauResumoHtml()
7326: **MULTAS E OUTRAS DESPESAS**
7327: multasOf()
7329: multaPagaAuto()
7334: multasAbertas()
7335: multasPendentes()
7336: multasResumoHtml()
7344: cobOf()
7345: dfCobFill()
7351: dfCobRead()
7354: dfCobInfo()
7364: cobResumoHtml()
7368: ajustesOf()
7372: ajusteVale()
7373: isoDia()
7375: vencProxima()
7376: previsaoProxima()
7390: previsaoHtml()
7394: dfAjRender()
7400: addAjuste()
7409: delAjuste()
7414: abrirAjustes()
7415: renderProxCobrancas()
7421: savePixExtra()
7429: dfMultFill()
7437: fdPaga()
7438: dfMultRender()
7447: toggleMultas()
7454: addMulta()
7464: delMulta()
7472: multaPaga()
7481: renderDriverExtras()
7509: mondayAfter()
7517: renderDriverProfileExtras()
7583: semanaDoPix()
7589: **MEUS RECIBOS (área do motorista)**
7591: meusRecibosLista()
7595: reciboRowHtml()
7603: renderEncerradoRecibos()
7608: openMeuReciboDireto()
7609: openMeusRecibos()
7616: closeMeusRecibos()
7617: reciboPdfHtml()
7628: verMeuRecibo()
7635: voltarMeusRecibos()
7636: pdfMeuRecibo()
7640: shareMeuRecibo()
7649: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7650: editVehicleRent()
7667: nextParcel()
7673: fillNewPixValues()
7709: newPixParts()
7740: **PERÍODO E VENCIMENTO DA COBRANÇA**
7741: dataISO()
7742: dataDe()
7743: dataMais()
7744: dataBR()
7745: diasEntre()
7746: isoSP()
7747: pixPeriodo()
7754: pixDesc()
7755: pixDiasPeriodo()
7760: marcarAjustesPorVenc()
7765: pixDatasNovo()
7774: pixDatasMudou()
7785: pixAluguelProporcional()
7793: pixPeriodoInfo()
7806: pixAddLinha()
7813: pixLinhas()
7815: descSoma()
7825: calcNewPix()
7834: **RECIBO DE PAGAMENTO**
7838: receiptValue()
7839: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7840: atrasoDados()
7844: cobrarAtraso()
7861: allocatePix()
7880: reciboData()
7903: fmtDateTimeBR()
7904: reciboTexto()
7955: openRecibo()
7972: closeRecibo()
7973: **CORRIGIR RECIBO**
7975: corrigirLinhaHtml()
7985: openCorrigirRecibo()
8008: closeCorrigirRecibo()
8009: corrigirLer()
8015: corrigirSoma()
8022: salvarCorrigirRecibo()
8039: copyRecibo()
8044: reciboCanvas()
8061: reciboPdfBlob()
8079: shareReciboPdf()
8095: rotularTabelas()
8113: areaAberta()
8114: markAreas()
8124: closeAreas()
8128: toggleArea()
8136: dobraSalva()
8137: setDobra()
8142: toggleDobra()
8149: dobraTopo()
8156: renderMasterResumo()
8170: renderMasterTopo()
8192: loadIA()
8214: updateIABadge()
8219: loadIASetting()
8225: paintIASwitch()
8231: toggleIA()
8238: loadRobo()
8247: iaPrepararQr()
8252: paintRobo()
8281: pedirCodigoRobo()
8290: toggleRobo()
8305: iaTodosGerar()
8323: iaTodosCancelar()
8327: iaTodosConfirmar()
8341: loadIARules()
8346: iaAbrirPdf()
8352: renderIARules()
8356: saveIARules()
8361: addIARule()
8366: delIARule()
8370: openIA()
8385: closeIA()
8386: iaShow()
8387: iaPhone()
8392: renderIA()
8434: iaAprovar()
8443: iaPhone2()
8444: iaSend()
8475: iaMark()
8486: iaDelete()
8497: openPixArea()
8506: closePixArea()
8507: renderPixArea()
8551: openEditPix()
8580: deletePix()
8592: closeNewPix()
8594: saveNewPix()
8685: pushSupported()
8686: isIOS()
8687: isStandalone()
8688: b64ToBytes()
8694: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8699: notifStatus()
8707: stepsList()
8711: notifHelpHtml()
8745: renderNotifModal()
8757: checkDriverNotifications()
8790: activateFromModal()
8803: refreshNotifButton()
8822: subscribePush()
8837: enableNotifications()
8857: closeDocViewer()
8865: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8877: allFeaturesOn()
8878: feat()
8879: loadDriverFeatures()
8886: saveDriverFeatures()
8891: drawFeatureToggles()
8906: setAllFeatures()
8917: applyDriverFeatures()
8932: **PIX: conferência do código e QR code desenhado no aparelho**
8933: crc16()
8941: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8943: pixTxt()
8944: pixCampo()
8945: pixGerarCodigo()
8955: pixAutoLigado()
8956: pixAutoMudou()
8961: gerarPixAuto()
8977: pixRecebedorCarregar()
8988: pixRecebedorGuardar()
8995: pixValid()
9001: renderPixQr()
9011: previewNewPixQr()
9021: **FOTO DO MOTORISTA (recortada da CNH)**
9022: photoPath()
9023: fileToCanvas()
9042: cropPhoto()
9056: savePhoto()
9061: photoBoxFrom()
9067: fillAvatar()
9078: fillAvatars()
9091: storedFile()
9098: photoFromCnh()
9110: **FOTO DO PERFIL ACOMPANHA A CNH**
9113: cnhStamp()
9114: photoFiles()
9122: avatarPath()
9127: syncCnhPhotos()
9151: pickImage()
9154: changeDriverPhoto()
9170: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9172: uploadTmp()
9179: clearTmp()
9184: aiReadFiles()
9190: okDateISO()
9192: noAccents()
9194: makeUsername()
9203: titleCase()
9204: syncNewDriverAccess()
9210: setNewDriverPhoto()
9215: pickNewDriverPhoto()
9219: resetNewDriverForm()
9227: newDriverDocChosen()
9261: anoCrlv()
9265: formatVehicleBrand()
9270: inferVehicleBrand()
9279: normalizeCrlvFields()
9298: applyCrlvFields()
9311: aiReadCrlv()
9325: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9326: sendWelcomeEmail()
9332: showCredentials()
9343: demoAssistente()
9362: **PERGUNTAR À IA (ÁREA IA, só o master)**
9366: iaChatReset()
9367: iaNorm()
9368: iaAcha()
9374: iaVeicTxt()
9375: iaCamposVeic()
9376: iaDataOk()
9377: iaOpcoes()
9378: iaTodosMotoristas()
9382: iaFerramenta()
9477: renderIAChat()
9494: iaChatDica()
9495: iaChatEnviar()
9530: iaChatNota()
9531: iaCancelarCartao()
9532: iaConfirmarCartao()
9577: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9578: syncAppFinState()
9587: renderAppEarnings()
9667: saveAppEarning()
9694: workDayISO()
9695: paintDayOff()
9704: renderDayOff()
9711: setDayOff()
9721: aiReadEarning()
9754: **DESPESAS DO APLICATIVO**
9756: appExpCustomTypes()
9757: fillAppExpTypes()
9764: onAppExpTypeChange()
9769: saveAppExpense()
9794: deleteAppExpense()
9803: deleteAppEarning()
9900: loadTermsAcceptances()
9912: termsOf()
9913: currentAcceptance()
9914: needsTermsAcceptance()
9917: fmtDateTime()
9920: termsPlainText()
9924: termsHash()
9932: openTermsGate()
9955: termsGateCheck()
9963: acceptTerms()
9983: acceptanceHtml()
9994: openTermsViewer()
10012: closeTerms()
10018: downloadTermsCopy()
10039: termsBadgeMaster()
10046: termsMasterDetail()
10087: renderTermsSetupBanner()
10100: copyTermsSql()
10110: cnhExpired()
10111: cnhWaiting()
10112: onlyDigits()
10113: normName()
10115: verifyCnh()
10127: renderCnhBanner()
10145: sendNewCnh()
10193: cnhBadgeMaster()
10201: applyPendingCnh()
10209: autoReadNewCnhs()
10227: cnhPendingHtml()
10241: recheckPendingCnh()
10251: rejectPendingCnh()
10261: showContractDoc()
10379: inspectPdfSignaturesBytes()
10398: readPdfFileAsBase64AndInspect()
10413: govBrSignersList()
10425: renderGovBrFlowBox()
10477: driverGovBrBlockHtml()
10506: govBrPublicAppBaseUrl()
10510: createGovBrInvite()
10542: submitMasterGovBrPdf()
10563: submitDriverGovBrPdf()
10582: loadGovBrInvitePage()
10653: submitGovBrInvitePdf()
10672: exitGovBrInviteToLogin()
10691: contractPeriodLabel()
10692: contractStatusBadge()
10696: pdfSafeText()
10708: contractPdfFileName()
10717: cwBuildDepositChargeText()
10759: cwBuildDepositClauseText()
10771: lcClauseStart()
10778: buildDefaultClauses()
10849: generateContractPdfBytes()
10868: drawHeader()
10873: newPage()
10880: ensureSpace()
10883: wrapLines()
10907: drawJustifiedLine()
11173: renderContractsTab()
11227: renderDriverRentalContractsBox()
11286: openContractForDriver()
11293: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11295: closeContractWizard()
11296: cwPopulateSelects()
11304: cwPopulateLocadores()
11316: cwOnLocadorChange()
11325: defaultWitness1ForLocador()
11333: cwApplyDefaultWitness1()
11346: cwFillLocador()
11355: cwFillDepositFromDriver()
11383: cwFillDepositFromComercial()
11405: cwSyncClauseIdx()
11414: cwSyncDepositClauseOnly()
11415: cwUpdateTrialPreview()
11431: cwDepCalc()
11476: cwApplyDriverContractDefaults()
11493: cwFillDriver()
11512: cwUpdateCrlvBar()
11521: cwNeedsCrlvFill()
11525: cwRefreshMissingBoxIfVisible()
11534: cwReadVehicleCrlv()
11583: cwReadCurrentVehicleCrlv()
11589: cwFillVehicle()
11611: cwOnDriverChange()
11627: cwOnVehicleChange()
11640: cwDefaultChecklist()
11645: cwToggleVistoriaFields()
11650: cwRenderInspChecklist()
11669: cwRenderInspDamagesSummary()
11683: cwRenderInspPhotos()
11720: cwUpdateInspPhotoDamage()
11728: cwSyncVistoriaFromVehicle()
11745: cwImportSavedPhotos()
11761: cwUploadInspPhotos()
11801: cwAnalyzeInspWithAI()
11810: cwReadSnapshot()
11869: cwRenderClausesEditor()
11879: cwRebuildClauses()
11887: cwRenderPreview()
11942: cwTogglePreview()
11947: validateContractForEmission()
11964: openContractWizard()
12099: cwSyncSources()
12154: logContractHistory()
12163: persistContract()
12254: saveContractDraft()
12255: emitContract()
12257: ensureContractPdfBlob()
12268: downloadContractPdf()
12280: printContractPdf()
12293: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12294: closeContractDetail()
12295: openContractDetail()
12368: saveContractSignatures()
12395: uploadSignedContractFile()
12417: terminateContractPrompt()
12432: clearDriverPathsIfMatching()
12442: cancelContractPrompt()
12458: deleteContractPrompt()
12512: inspectionTypeBadge()
12516: inspectionStatusBadge()
12520: inspectionPdfFileName()
12527: switchContractsSubtab()
12540: renderInspectionsTab()
12600: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12601: runInspectionBatchAI()
12624: promptInspectionDamageConfirmation()
12702: processInspectionPhotosWithAI()
12758: analyzeSavedInspectionPhotos()
12774: renameInspectionPhoto()
12790: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12793: closeInspectionWizard()
12794: openInspectionWizard()
12858: iwCollectSavedPhotosFor()
12891: iwPopulateContractsAndBase()
12914: iwSyncHeaderAndLegal()
12926: iwOnTypeChange()
12932: iwOnVehicleChange()
12950: iwOnDriverChange()
12955: iwOnContractChange()
12962: iwImportSavedPhotos()
12973: iwUploadPhotos()
13026: iwResolveEntregaBaseline()
13047: iwRunAIOnList()
13073: iwAnalyzeWithAI()
13080: iwRenderPhotos()
13119: iwUpdatePhotoField()
13124: iwUpdatePhotoDamage()
13132: iwRemovePhoto()
13138: iwRenderDamagesSummary()
13153: iwRenderComparison()
13172: iwRenderChecklist()
13191: persistInspectionTerm()
13294: saveInspectionDraft()
13295: emitInspectionTerm()
13297: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13298: blobToEmbeddableJpeg()
13328: embedBlobIntoPdf()
13341: generateInspectionPdfBytes()
13541: ensureInspectionPdfBlob()
13551: downloadInspectionPdf()
13563: printInspectionPdf()
13576: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13577: closeInspectionDetail()
13578: openInspectionDetail()
13638: saveInspectionSignatures()
13664: uploadSignedInspectionFile()
13686: cancelInspectionPrompt()

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

## supabase/functions/motora-push/index.ts (443 linhas)

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
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

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
- supabase/2026-11-25-mudar-dia-pagamento.sql: MUDAR DIA DO PAGAMENTO e levar junto a cobrança em aberto (25/11/2026, pedido do dono; caso da Argelia)
